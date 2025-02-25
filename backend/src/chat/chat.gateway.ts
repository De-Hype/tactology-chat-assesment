import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { UserService } from 'src/users/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Track user connections and rooms
  private connectedUsers: Map<string, { userId: string; username: string }> =
    new Map();
  private userRooms: Map<string, string> = new Map(); // socketId -> roomName

  constructor(
    private jwtService: JwtService,
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth.token ||
        client.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new WsException('Unauthorized');
      }

      const payload = this.jwtService.verify<JwtPayload>(token);
      const user = await this.userService.findById(payload.sub);

      if (!user) {
        throw new WsException('User not found');
      }

      // Store user connection
      this.connectedUsers.set(client.id, {
        userId: user.id,
        username: user.username,
      });

      console.log(`Client connected: ${user.username}`);
    } catch (error) {
      console.error('Connection error:', error.message);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const user = this.connectedUsers.get(client.id);
    const room = this.userRooms.get(client.id);

    if (user && room) {
      // Leave any rooms the user was in
      const message = await this.chatService.leaveRoom(user.username, room);
      this.server.to(room).emit('message', message);
    }

    this.connectedUsers.delete(client.id);
    this.userRooms.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, payload: { room: string }) {
    try {
      const user = this.connectedUsers.get(client.id);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      const { room } = payload;

      // Leave previous room if exists
      const previousRoom = this.userRooms.get(client.id);
      if (previousRoom) {
        client.leave(previousRoom);
        const leaveMessage = await this.chatService.leaveRoom(
          user.username,
          previousRoom,
        );
        this.server.to(previousRoom).emit('message', leaveMessage);
      }

      // Join new room
      client.join(room);
      this.userRooms.set(client.id, room);

      const joinMessage = await this.chatService.joinRoom(user.username, room);
      this.server.to(room).emit('message', joinMessage);

      return {
        event: 'message',
        data: joinMessage.systemMessage,
      };
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: { text: string }) {
    try {
      const user = this.connectedUsers.get(client.id);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      const room = this.userRooms.get(client.id);
      if (!room) {
        throw new WsException('Not in a room');
      }

      const { text } = payload;
      const message = this.chatService.createMessage(user.username, text, room);

      this.server.to(room).emit('message', message);

      return {
        event: 'message',
        data: message,
      };
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket) {
    try {
      const user = this.connectedUsers.get(client.id);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      const room = this.userRooms.get(client.id);
      if (!room) {
        throw new WsException('Not in a room');
      }

      client.leave(room);
      this.userRooms.delete(client.id);

      const message = await this.chatService.leaveRoom(user.username, room);
      this.server.to(room).emit('message', message);

      return {
        event: 'message',
        data: message.systemMessage,
      };
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('getActiveUsers')
  handleGetActiveUsers(client: Socket) {
    try {
      const room = this.userRooms.get(client.id);
      if (!room) {
        throw new WsException('Not in a room');
      }

      const activeUsers = this.chatService.getActiveUsers(room);

      return {
        event: 'activeUsers',
        data: activeUsers,
      };
    } catch (error) {
      throw new WsException(error.message);
    }
  }
}

import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { UserService } from 'src/users/user.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    private chatService;
    private userService;
    server: Server;
    private connectedUsers;
    private userRooms;
    constructor(jwtService: JwtService, chatService: ChatService, userService: UserService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleJoinRoom(client: Socket, payload: {
        room: string;
    }): Promise<{
        event: string;
        data: string;
    }>;
    handleSendMessage(client: Socket, payload: {
        text: string;
    }): Promise<{
        event: string;
        data: import("./dto/message.response").MessageResponse;
    }>;
    handleLeaveRoom(client: Socket): Promise<{
        event: string;
        data: string;
    }>;
    handleGetActiveUsers(client: Socket): {
        event: string;
        data: string[];
    };
}

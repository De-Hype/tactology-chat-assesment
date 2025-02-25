import { Injectable } from '@nestjs/common';
import { RoomService } from '../room/room.service';
import { MessageResponse } from './dto/message.response';

@Injectable()
export class ChatService {
  private activeUsers: Map<string, Set<string>> = new Map(); // roomName -> Set of usernames

  constructor(private roomService: RoomService) {
    // Initialize default room
    this.roomService.create('General').catch((err) => {
      // Ignore if room already exists
      if (err.code !== '23505') {
        // PostgreSQL duplicate key error
        console.error('Error creating default room:', err);
      }
    });
  }

  async joinRoom(username: string, roomName: string): Promise<MessageResponse> {
    await this.roomService.findOneByName(roomName);

    if (!this.activeUsers.has(roomName)) {
      this.activeUsers.set(roomName, new Set());
    }

    this.activeUsers.get(roomName).add(username);

    return {
      sender: 'System',
      systemMessage: `${username} joined the room`,
      timestamp: new Date().toISOString(),
      room: roomName,
    };
  }

  async leaveRoom(
    username: string,
    roomName: string,
  ): Promise<MessageResponse> {
    await this.roomService.findOneByName(roomName);

    if (this.activeUsers.has(roomName)) {
      this.activeUsers.get(roomName).delete(username);
    }

    return {
      sender: 'System',
      systemMessage: `${username} left the room`,
      timestamp: new Date().toISOString(),
      room: roomName,
    };
  }

  getActiveUsers(roomName: string): string[] {
    if (!this.activeUsers.has(roomName)) {
      return [];
    }
    return Array.from(this.activeUsers.get(roomName));
  }

  createMessage(
    sender: string,
    text: string,
    roomName: string,
  ): MessageResponse {
    return {
      sender,
      text,
      timestamp: new Date().toISOString(),
      room: roomName,
    };
  }
}

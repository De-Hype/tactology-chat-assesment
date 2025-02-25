import { RoomService } from '../room/room.service';
import { MessageResponse } from './dto/message.response';
export declare class ChatService {
    private roomService;
    private activeUsers;
    constructor(roomService: RoomService);
    joinRoom(username: string, roomName: string): Promise<MessageResponse>;
    leaveRoom(username: string, roomName: string): Promise<MessageResponse>;
    getActiveUsers(roomName: string): string[];
    createMessage(sender: string, text: string, roomName: string): MessageResponse;
}

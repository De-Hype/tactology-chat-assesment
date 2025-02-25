import { MessageResponse } from './dto/message.response';
import { JoinRoomInput } from './dto/join-room.input';
import { LeaveRoomInput } from './dto/leave-room.input';
import { SendMessageInput } from './dto/send-message.input';
import { ChatService } from './chat.service';
export declare class ChatResolver {
    private chatService;
    constructor(chatService: ChatService);
    joinRoom(joinRoomInput: JoinRoomInput, user: any): Promise<MessageResponse>;
    leaveRoom(leaveRoomInput: LeaveRoomInput, user: any): Promise<MessageResponse>;
    sendMessage(sendMessageInput: SendMessageInput, user: any): Promise<MessageResponse>;
    activeUsers(room: string): string[];
}

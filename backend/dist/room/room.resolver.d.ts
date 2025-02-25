import { RoomService } from './room.service';
import { Room } from './entities/room.entity';
export declare class RoomResolver {
    private roomService;
    constructor(roomService: RoomService);
    rooms(): Promise<Room[]>;
    createRoom(name: string): Promise<Room>;
}

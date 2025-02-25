import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
export declare class RoomService {
    private roomRepository;
    constructor(roomRepository: Repository<Room>);
    findAll(): Promise<Room[]>;
    findOneByName(name: string): Promise<Room>;
    create(name: string): Promise<Room>;
}

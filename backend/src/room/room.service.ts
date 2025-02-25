import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findOneByName(name: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { name } });
    if (!room) {
      throw new NotFoundException(`Room ${name} not found`);
    }
    return room;
  }

  async create(name: string): Promise<Room> {
    const room = this.roomRepository.create({ name });
    return this.roomRepository.save(room);
  }
}

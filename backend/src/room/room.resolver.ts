import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoomService } from './room.service';
import { Room } from './entities/room.entity';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @Query(() => [Room])
  @UseGuards(JwtAuthGuard)
  async rooms(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Mutation(() => Room)
  @UseGuards(JwtAuthGuard)
  async createRoom(@Args('name') name: string): Promise<Room> {
    return this.roomService.create(name);
  }
}

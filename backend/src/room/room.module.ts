import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from './entities/room.entity';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomService, RoomResolver],
  exports: [RoomService],
})
export class RoomModule {}

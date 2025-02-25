import { Module } from '@nestjs/common';

import { ChatService } from './chat.service';
import { RoomModule } from '../room/room.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/users/users.module';
import { ChatResolver } from './chat.resolver';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    RoomModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h'),
        },
      }),
    }),
  ],
  providers: [ChatGateway, ChatResolver, ChatService],
})
export class ChatModule {}

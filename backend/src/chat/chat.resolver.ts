import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessageResponse } from './dto/message.response';
import { JoinRoomInput } from './dto/join-room.input';
import { LeaveRoomInput } from './dto/leave-room.input';
import { SendMessageInput } from './dto/send-message.input';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ChatService } from './chat.service';

const pubSub = new PubSub();

@Resolver()
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Mutation(() => MessageResponse)
  @UseGuards(JwtAuthGuard)
  async joinRoom(
    @Args('joinRoomInput') joinRoomInput: JoinRoomInput,
    @CurrentUser() user: any,
  ): Promise<MessageResponse> {
    const { room } = joinRoomInput;
    const message = await this.chatService.joinRoom(user.username, room);

    pubSub.publish(`room_${room}`, { roomMessages: message });
    return message;
  }

  @Mutation(() => MessageResponse)
  @UseGuards(JwtAuthGuard)
  async leaveRoom(
    @Args('leaveRoomInput') leaveRoomInput: LeaveRoomInput,
    @CurrentUser() user: any,
  ): Promise<MessageResponse> {
    const { room } = leaveRoomInput;
    const message = await this.chatService.leaveRoom(user.username, room);

    pubSub.publish(`room_${room}`, { roomMessages: message });
    return message;
  }

  @Mutation(() => MessageResponse)
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Args('sendMessageInput') sendMessageInput: SendMessageInput,
    @CurrentUser() user: any,
  ): Promise<MessageResponse> {
    const { text, room } = sendMessageInput;
    const message = this.chatService.createMessage(user.username, text, room);

    pubSub.publish(`room_${room}`, { roomMessages: message });
    return message;
  }

  @Query(() => [String])
  @UseGuards(JwtAuthGuard)
  activeUsers(@Args('room') room: string): string[] {
    return this.chatService.getActiveUsers(room);
  }

  //   @Subscription(() => MessageResponse, {
  //     filter: (payload, variables) => {
  //       return payload.roomMessages.room === variables.room;
  //     },
  //   })
  //   roomMessages(@Args('room') room: string) {
  //     return pubSub.asyncIterator(`room_${room}`);
  //   }
}

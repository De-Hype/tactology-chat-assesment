import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LeaveRoomInput {
  @Field()
  @IsNotEmpty()
  room: string;
}

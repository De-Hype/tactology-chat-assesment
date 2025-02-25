import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class JoinRoomInput {
  @Field()
  @IsNotEmpty()
  room: string;
}

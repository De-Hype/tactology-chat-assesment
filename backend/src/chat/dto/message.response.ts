import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field()
  sender: string;

  @Field({ nullable: true })
  text?: string;

  @Field()
  timestamp: string;

  @Field()
  room: string;

  @Field({ nullable: true })
  systemMessage?: string;
}

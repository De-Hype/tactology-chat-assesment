import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field()
  user_id: string;

  @Field()
  username: string;
}

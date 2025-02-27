import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';



@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: any): Promise<User> {
    return this.userService.findById(user.userId);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@CurrentUser() user: any): Promise<User> {
    return this.userService.deleteUser(user.userId);
  }

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.userService.create(email, username, password);
  }
}

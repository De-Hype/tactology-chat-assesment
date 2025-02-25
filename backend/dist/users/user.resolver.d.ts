import { UserService } from './user.service';
import { User } from './entities/user.entity';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    me(user: any): Promise<User>;
    createUser(username: string, password: string): Promise<User>;
}

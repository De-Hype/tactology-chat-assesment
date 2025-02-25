import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response';
import { UserService } from 'src/users/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(loginInput: LoginInput): Promise<LoginResponse>;
}

import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(loginInput: LoginInput): Promise<LoginResponse>;
}

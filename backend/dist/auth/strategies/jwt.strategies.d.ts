import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { UserService } from 'src/users/user.service';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: JwtPayload): Promise<{
        userId: string;
        username: string;
    }>;
}
export {};

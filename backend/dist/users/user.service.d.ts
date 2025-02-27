import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findById(id: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    deleteUser(email: string): Promise<User>;
    create(email: string, username: string, password: string): Promise<User>;
}

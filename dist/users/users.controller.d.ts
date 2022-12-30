import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDTO, User, UserActionDTO } from './models/users.model';
export declare class UsersController {
    private readonly userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    addUser(createUserDto: CreateUserDTO): Promise<{
        message: string;
        userId: any;
        userName: string;
    }>;
    addAdminRole(body: any): Promise<boolean>;
    signIn(request: any): Promise<any>;
    getProfile(request: any): UserActionDTO;
    getAllUsers(): Promise<User[]>;
    deleteUser(body: any): Promise<{
        user: User & Required<{
            _id: string;
        }>;
        orders: {
            orders: import("mongodb").DeleteResult;
            deletedUserOrders: number;
            sucess: boolean;
        };
        sucess: boolean;
    }>;
}

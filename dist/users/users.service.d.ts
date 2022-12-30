import { Model, Types } from 'mongoose';
import { OrdersService } from 'src/orders/orders.service';
import { User } from './models/users.model';
export declare class UsersService {
    private readonly userModel;
    private readonly ordersService;
    constructor(userModel: Model<User>, ordersService: OrdersService);
    getAllUsers(): Promise<(User & Required<{
        _id: string;
    }>)[]>;
    saveUser(userName: string, password: string): Promise<User & Required<{
        _id: string;
    }>>;
    getUser(userName: string): Promise<User & Required<{
        _id: string;
    }>>;
    getUserById(_id: Types.ObjectId): Promise<User & Required<{
        _id: string;
    }>>;
    addAdminRole(userId: string): Promise<boolean>;
    deleteUser(_id: string): Promise<{
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

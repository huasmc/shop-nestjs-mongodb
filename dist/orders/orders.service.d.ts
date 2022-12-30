import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto, Order, UpdateOrderDto } from './models/orders.model';
export declare class OrdersService {
    private readonly usersService;
    private readonly orderModel;
    constructor(usersService: UsersService, orderModel: Model<Order>);
    getOrders(skipOrders: number, limit?: number): Promise<(Order & Required<{
        _id: string;
    }>)[]>;
    findUserOrders(user_id: string, skipOrders: number, limit: number): Promise<{
        orders: (Order & Required<{
            _id: string;
        }>)[];
        count: number;
    }>;
    saveOrder(createOrderDto: CreateOrderDto): Promise<(Order & Required<{
        _id: string;
    }>) | {
        message: string;
        sucess: boolean;
    }>;
    updateOrder(updateOrderDto: UpdateOrderDto): Promise<Order & Required<{
        _id: string;
    }>>;
    deleteOrder(_id: string): Promise<{
        order: Order & Required<{
            _id: string;
        }>;
        success: boolean;
    }>;
    deleteUserOrders(_id: string): Promise<{
        orders: import("mongodb").DeleteResult;
        deletedUserOrders: number;
        sucess: boolean;
    }>;
}

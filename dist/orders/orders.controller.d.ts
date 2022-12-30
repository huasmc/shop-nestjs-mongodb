import { CreateOrderDto, UpdateOrderDto } from './models/orders.model';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAllOrders(skipOrders: number, limit: number): Promise<(import("./models/orders.model").Order & Required<{
        _id: string;
    }>)[]>;
    getUserOrders(user_id: string, skipOrders: number, limit: any): Promise<{
        orders: (import("./models/orders.model").Order & Required<{
            _id: string;
        }>)[];
        count: number;
    }>;
    addOrder(createOrderDto: CreateOrderDto): Promise<(import("./models/orders.model").Order & Required<{
        _id: string;
    }>) | {
        message: string;
        sucess: boolean;
    }>;
    deleteOrder(body: any): Promise<{
        order: import("./models/orders.model").Order & Required<{
            _id: string;
        }>;
        success: boolean;
    }>;
    updateOrder(updateOrderDto: UpdateOrderDto): Promise<import("./models/orders.model").Order & Required<{
        _id: string;
    }>>;
}

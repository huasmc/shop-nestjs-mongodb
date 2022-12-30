import * as mongoose from 'mongoose';
export declare const OrderSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    product_id: string;
    user_id: string;
    quantity: number;
}>;
export interface Order extends mongoose.Document {
    _id: string;
    product_id: string;
    user_id: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateOrderDto {
    product_id: string;
    user_id: string;
    quantity: number;
}
export interface UpdateOrderDto {
    _id: string;
    quantity: number;
}

import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
      unique: false,
    },
    user_id: {
      type: String,
      required: true,
      unique: false,
    },
    quantity: {
      type: Number,
      required: true,
      unique: false,
    },
  },

  { timestamps: true },
);

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

export interface ReadOrdersDto {
  skipOrders: number;
  limit: number;
}

export interface ReadUserOrdersDto {
  user_id: string;
  skipOrders: number;
  limit: number;
}

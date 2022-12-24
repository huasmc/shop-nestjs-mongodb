import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
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

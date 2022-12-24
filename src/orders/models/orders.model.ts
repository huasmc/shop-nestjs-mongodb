import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export interface Order extends mongoose.Document {
  _id: string;
  product_id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDto {
  product_id: string;
  user_id: string;
}

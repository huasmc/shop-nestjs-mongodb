import * as mongoose from 'mongoose';
import { Role } from 'src/auth/roles/roles.enum';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      readonly: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
      default: [Role.USER],
    },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  _id: string;
  username: string;
  password: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDTO {
  username: string;
  password: string;
}

export interface UserActionDTO {
  _id: string;
  username: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

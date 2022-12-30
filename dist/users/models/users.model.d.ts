import * as mongoose from 'mongoose';
import { Role } from 'src/auth/roles/roles.enum';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roles: string[];
    username: string;
    password: string;
}>;
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

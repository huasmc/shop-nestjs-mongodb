import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Strategy } from 'passport-jwt';
import { User } from 'src/users/models/users.model';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userModel;
    constructor(configService: ConfigService, userModel: Model<User>);
    validate(payload: any): Promise<User & Required<{
        _id: string;
    }>>;
}
export {};

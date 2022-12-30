"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/passport/dist");
const users_module_1 = require("../users/users.module");
const auth_service_1 = require("./auth.service");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("@nestjs/common/utils");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const users_model_1 = require("../users/models/users.model");
const mongoose_1 = require("@nestjs/mongoose");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, utils_1.forwardRef)(() => users_module_1.UsersModule),
            dist_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    return {
                        secret: configService.get('JWT_SECRET'),
                        signOptions: { expiresIn: '300s' },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: users_model_1.UserSchema }]),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const roles_enum_1 = require("../auth/roles/roles.enum");
const orders_service_1 = require("../orders/orders.service");
const exceptions_1 = require("@nestjs/common/exceptions");
let UsersService = class UsersService {
    constructor(userModel, ordersService) {
        this.userModel = userModel;
        this.ordersService = ordersService;
    }
    async getAllUsers() {
        const users = this.userModel.find().select({ password: 0 });
        return users;
    }
    async saveUser(userName, password) {
        const username = userName.toLowerCase();
        const user = await this.userModel.findOne({ username });
        if (user) {
            throw new exceptions_1.ConflictException('Username taken');
        }
        const newUser = new this.userModel({ username, password });
        await newUser.save();
        return newUser;
    }
    async getUser(userName) {
        const username = userName.toLowerCase();
        const user = this.userModel.findOne({ username });
        return user;
    }
    async getUserById(_id) {
        const user = this.userModel.findOne({ _id });
        return user;
    }
    async addAdminRole(userId) {
        const result = await this.userModel.updateOne({ _id: new mongoose_2.Types.ObjectId(userId) }, { $addToSet: { roles: roles_enum_1.Role.ADMIN } });
        if (result && result.modifiedCount > 0)
            return true;
        return false;
    }
    async deleteUser(_id) {
        const deletedUser = await this.userModel.findOneAndDelete({ _id });
        const deletedOrders = await this.ordersService.deleteUserOrders(_id);
        return {
            user: deletedUser,
            orders: deletedOrders,
            sucess: deletedUser !== null,
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __param(1, (0, common_1.Inject)(orders_service_1.OrdersService)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        orders_service_1.OrdersService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
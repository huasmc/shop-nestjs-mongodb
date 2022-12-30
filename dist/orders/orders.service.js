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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("@nestjs/common/utils");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
let OrdersService = class OrdersService {
    constructor(usersService, orderModel) {
        this.usersService = usersService;
        this.orderModel = orderModel;
    }
    async getOrders(skipOrders, limit) {
        const count = await this.orderModel.countDocuments();
        const orders = this.orderModel.find({}, {}, { skip: skipOrders, limit: limit });
        return Object.assign(Object.assign({}, orders), { count });
    }
    async findUserOrders(user_id, skipOrders, limit) {
        const orders = await this.orderModel.find({ user_id }, {}, { skip: skipOrders, limit: limit });
        const count = await this.orderModel.countDocuments({ user_id });
        return { orders: orders, count };
    }
    async saveOrder(createOrderDto) {
        const newOrder = new this.orderModel(createOrderDto);
        const user = await this.usersService.getUserById(new mongoose_2.Types.ObjectId(createOrderDto.user_id));
        if (!user)
            return { message: 'User doesnt exist', sucess: false };
        else if (user) {
            await newOrder.save();
            return newOrder;
        }
    }
    async updateOrder(updateOrderDto) {
        const updatedOrder = this.orderModel.findOneAndUpdate({ _id: updateOrderDto._id }, { $set: { quantity: updateOrderDto.quantity } }, { new: true });
        return updatedOrder;
    }
    async deleteOrder(_id) {
        const deletedOrder = await this.orderModel.findOneAndDelete({ _id }).exec();
        return { order: deletedOrder, success: deletedOrder !== null };
    }
    async deleteUserOrders(_id) {
        const deletedUserOrders = await this.orderModel.deleteMany({
            user_id: _id,
        });
        const deletedCount = deletedUserOrders.deletedCount;
        return {
            orders: deletedUserOrders,
            deletedUserOrders: deletedUserOrders.deletedCount,
            sucess: deletedCount > 0,
        };
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, utils_1.forwardRef)(() => users_service_1.UsersService))),
    __param(1, (0, mongoose_1.InjectModel)('order')),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        mongoose_2.Model])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose = require("mongoose");
exports.OrderSchema = new mongoose.Schema({
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
}, { timestamps: true });
//# sourceMappingURL=orders.model.js.map
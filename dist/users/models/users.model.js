"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const roles_enum_1 = require("../../auth/roles/roles.enum");
exports.UserSchema = new mongoose.Schema({
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
        default: [roles_enum_1.Role.USER],
    },
}, { timestamps: true });
//# sourceMappingURL=users.model.js.map
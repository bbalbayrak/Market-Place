"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMarketOwner = exports.isAdmin = exports.isUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const isUser = (req, res, next) => {
    // userRole =
};
exports.isUser = isUser;
const isAdmin = (permission) => {
    const userRole = user_1.default.find({ role: "admin" });
    return (req, res, next) => {
        if (permission.includes(userRole)) {
            next();
        }
        else {
            return res.status(401).json({ message: "You dont have permission !" });
        }
    };
};
exports.isAdmin = isAdmin;
const isMarketOwner = (permission) => {
    const userRole = user_1.default.find({ role: "marketOwner" });
    return (req, res, next) => {
        if (permission.includes(userRole)) {
            next();
        }
        else {
            return res.status(401).json({ message: "You dont have permission !" });
        }
    };
};
exports.isMarketOwner = isMarketOwner;

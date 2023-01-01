"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChangeRole = exports.postChangeRole = exports.postAdminProducts = exports.getAdminProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
function getAdminProducts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield product_1.default.find();
        if (!products) {
            return res.status(404).json({ message: "Product can not found !" });
        }
        return res.status(200).json({
            message: "Successfully fetched!",
            products: products,
        });
    });
}
exports.getAdminProducts = getAdminProducts;
function postAdminProducts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description;
        const userId = req.userId;
        //Admin Check
        const user = yield user_1.default.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User can not found" });
        }
        if (user.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Only admin can do this operation" });
        }
        const product = new product_1.default({
            title: title,
            price: price,
            description: description,
            userId: req.userId,
        });
        try {
            yield product.save();
            res
                .status(201)
                .json({ message: "Product successfully created!", product: product });
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    });
}
exports.postAdminProducts = postAdminProducts;
function postChangeRole(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const roleChangeId = req.params.userUpdate;
        const role = req.body.role;
        //ADMIN CHECK
        const adminUser = yield user_1.default.findById(userId);
        if (!adminUser) {
            return res.status(404).json({ message: "User can not found" });
        }
        if (adminUser.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Only admin can do this operation" });
        }
        const user = yield user_1.default.findById(roleChangeId);
        if (!user) {
            return res.status(404).json({ message: "User can not found" });
        }
        if (user.role === "admin") {
            return res
                .status(400)
                .json({ message: "One admin can not change other admins role" });
        }
        user.role = role;
        try {
            yield user.save();
            res.status(201).json({ message: "User role successfully updated!" });
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    });
}
exports.postChangeRole = postChangeRole;
function getChangeRole(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const roleChangeId = req.params.userUpdate;
        //ADMIN CHECH
        const adminUser = yield user_1.default.findById(userId);
        if (!adminUser) {
            return res.status(404).json({ message: "User can not found" });
        }
        if (adminUser.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Only admin can do this operation" });
        }
        const existingUser = yield user_1.default.findById(roleChangeId);
        if (!existingUser) {
            return res.status(404).json({ message: "User can not found" });
        }
        return res.status(200).json({
            message: "User successfully fetched",
            userRole: existingUser.role,
        });
    });
}
exports.getChangeRole = getChangeRole;

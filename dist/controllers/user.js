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
exports.premiumPostCart = exports.postCart = exports.getCart = void 0;
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
function getCart(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User can not found!" });
        }
        const items = user.cart.items;
        return res
            .status(200)
            .json({ message: "There is your cart items", items: items });
    });
}
exports.getCart = getCart;
function postCart(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const productId = req.params.productId;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User can not found!" });
        }
        const userProduct = yield product_1.default.findById(productId);
        const addToCart = (product) => {
            const cartProductIndex = user.cart.items.findIndex((cp) => {
                return cp.productId.toString() === product._id.toString();
            });
            let newQuantity = 1;
            const updatedCartItems = [...user.cart.items];
            if (cartProductIndex >= 0) {
                newQuantity = user.cart.items[cartProductIndex].quantity + 1;
                updatedCartItems[cartProductIndex].quantity = newQuantity;
            }
            else {
                updatedCartItems.push({
                    productId: product._id,
                    quantity: newQuantity,
                });
            }
            //ONLY PREMIUM
            if (user.role !== "premium" &&
                user.cart.items[cartProductIndex].quantity === 3) {
                return res
                    .status(400)
                    .json({ message: "Only premium users can buy more than 3 products" });
            }
            const updatedCart = { items: updatedCartItems };
            user.cart = updatedCart;
            return user.save();
        };
        addToCart(userProduct);
        return res
            .status(201)
            .json({ message: "Added to cart !", cartItems: user.cart.items });
    });
}
exports.postCart = postCart;
function premiumPostCart(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.productId;
        const userId = req.userId;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User can not found !" });
        }
    });
}
exports.premiumPostCart = premiumPostCart;

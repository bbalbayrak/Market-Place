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
exports.deleteFavorite = exports.addFavorite = exports.getFavotire = exports.deleteCart = exports.postCart = exports.getCart = void 0;
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
                user.cart.items[cartProductIndex].quantity > 3) {
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
function deleteCart(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.productId;
        const userId = req.userId;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User can not found !" });
        }
        const deleteCart = function () {
            // const existingItem = user.cart.items.findIndex((p: any) => {
            //   return p.productId.toString() === productId;
            // });
            // const updatedCartItems = [...user.cart.items];
            // if (existingItem >= 0) {
            //   return user.cart.items[existingItem].quantity - 1;
            // }
            // const selectedItem = user.cart.items.filter((item: any) => {
            //   let deletedQuantity = 1;
            //   if (item.productId.toString() === productId) {
            //     return item.quantity;
            //   }
            //   if (item.quantity === 1) {
            //     return user.cart.items.filter((p: any) => {
            //       return p.productId.toString() !== productId;
            //     });
            //   }
            // });
            const deletedItem = user.cart.items.filter((item) => {
                return item.productId.toString() !== productId;
            });
            user.cart.items = deletedItem;
            return user.save();
        };
        deleteCart();
        return res
            .status(201)
            .json({ message: "Cart successfully deleted !", cart: user.cart.items });
    });
}
exports.deleteCart = deleteCart;
function getFavotire(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User can not found !" });
        }
        if (user.role === "marketOwner") {
            return res
                .status(403)
                .json({ message: "Market Owners can not do this operation." });
        }
        const favorites = user.favorites;
        return res
            .status(200)
            .json({ message: "Here is your favorite products", favorites: favorites });
    });
}
exports.getFavotire = getFavotire;
function addFavorite(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const productId = req.params.productId;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User can not found !" });
        }
        if (user.role === "marketowner") {
            return res
                .status(403)
                .json({ message: "Market owner can not do this operation." });
        }
        const selectedProduct = yield product_1.default.findById(productId);
        const addToFavorites = (product) => {
            const existingProduct = user.favorites.favoriteItems.findIndex((p) => {
                return p.productId.toString() === product._id.toString();
            });
            const favoriteProducts = [...user.favorites.favoriteItems];
            if (existingProduct >= 0) {
                return res
                    .status(403)
                    .json({ message: "You can not add same product to favorite." });
            }
            else {
                favoriteProducts.push({
                    productId: product._id,
                });
            }
            const updatedFavorites = { favoriteItems: favoriteProducts };
            user.favorites = updatedFavorites;
            return user.save();
        };
        addToFavorites(selectedProduct);
        const favorites = user.favorites.favoriteItems;
        return res.status(201).json({
            message: "Favorite product successfully added your favorites.",
            favorites: favorites,
        });
    });
}
exports.addFavorite = addFavorite;
function deleteFavorite(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const productId = req.params.productId;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User can not found !" });
        }
        const isFavoriteEmpty = user.favorites.favoriteItems.findIndex((fav) => {
            return fav.productId.toString() === productId;
        });
        if (isFavoriteEmpty === 0 || isFavoriteEmpty === -1) {
            return res
                .status(400)
                .json({ message: "Selected item is not your favorite !" });
        }
        const deleteFav = function () {
            const deletedFav = user.favorites.favoriteItems.filter((fav) => {
                return fav.productId.toString() !== productId;
            });
            user.favorites.favoriteItems = deletedFav;
            user.save();
        };
        deleteFav();
        return res.status(201).json({
            message: "Selected favorite item successfully deleted",
            favorites: user.favorites.favoriteItems,
        });
    });
}
exports.deleteFavorite = deleteFavorite;

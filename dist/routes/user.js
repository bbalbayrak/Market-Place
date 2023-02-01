"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validation_1 = __importDefault(require("../middleware/validation"));
const authCheck_1 = __importDefault(require("../middleware/authCheck"));
const marketOwner_1 = require("../controllers/marketOwner");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
//User Sign Up - POST
router.post("/signup", auth_1.signUp, (0, validation_1.default)(auth_1.dataSchema));
//User Login - POST
router.post("/login", auth_1.login, (0, validation_1.default)(auth_1.dataSchema));
//MARKET OWNER OPERATIONS
//Market Owner Get Own Market - GET
router.get("/market/:marketOwnerId", authCheck_1.default, marketOwner_1.hasMarket);
//Market Owner Change Own Market Name - POST
router.post("/market/:marketOwnerId", authCheck_1.default, marketOwner_1.updateMarket);
//Market Owner Delete Own Market Name - POST
router.delete("/market/:marketOwnerId", authCheck_1.default, marketOwner_1.deleteMarket);
//USER OPERATIONS
//Get Cart
router.get("/cart", authCheck_1.default, user_1.getCart);
//Add To Cart
router.post("/cart/:productId", authCheck_1.default, user_1.postCart);
//Delete Cart
router.delete("/cart/:productId", authCheck_1.default, user_1.deleteCart);
//Get Favorite Product
router.get("/favorite", authCheck_1.default, user_1.getFavotire);
//Add Favorite Product
router.post("/favorite/:productId", authCheck_1.default, user_1.addFavorite);
//Delete Favorite Product
router.delete("/favorite/:productId", authCheck_1.default, user_1.deleteFavorite);
exports.default = router;

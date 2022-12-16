"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import checkIsAuth from "../middleware/authCheck";
const product_1 = require("../controllers/product");
const authCheck_1 = __importDefault(require("../middleware/authCheck"));
const router = (0, express_1.Router)();
//GET PRODUCTS
router.get("/", authCheck_1.default, product_1.getProducts);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import checkIsAuth from "../middleware/authCheck";
const admin_1 = require("../controllers/admin");
const authCheck_1 = __importDefault(require("../middleware/authCheck"));
const router = (0, express_1.Router)();
//GET ADMIN PRODUCTS
router.get("/products", authCheck_1.default, admin_1.getAdminProducts);
//POST ADMIN PRODUCTS
router.post("/add-product", authCheck_1.default, admin_1.postAdminProducts);
//ADMIN CHANGE ROLE - GET USER
router.get("/user/:userUpdate", authCheck_1.default, admin_1.getChangeRole);
//ADMIN CHANGE ROLE - POST USER
router.post("/user/:userUpdate", authCheck_1.default, admin_1.postChangeRole);
exports.default = router;

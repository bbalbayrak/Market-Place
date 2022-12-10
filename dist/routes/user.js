"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validation_1 = __importDefault(require("../middleware/validation"));
const router = (0, express_1.Router)();
//User Sign Up
router.post("/signup", user_1.signUp, (0, validation_1.default)(user_1.dataSchema));
//User Login
router.post("/login", user_1.login, (0, validation_1.default)(user_1.dataSchema));
exports.default = router;

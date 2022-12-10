"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
//User Sign Up
router.post("/signup", user_1.signUp);
//User Login
router.post("/login", user_1.login);
exports.default = router;

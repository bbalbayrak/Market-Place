"use strict";
// import { NextFunction, Request, Response } from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return res
            .status(403)
            .json({ message: "A token is required for authentication" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
        if (typeof decoded === "string") {
            return next(new Error("Invalid"));
        }
        req.userId = decoded.userId;
    }
    catch (err) {
        // console.log(err);
        return res.status(401).send("Invalid Token");
    }
    return next();
};
exports.default = verifyToken;

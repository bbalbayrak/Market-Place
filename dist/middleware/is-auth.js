"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    try {
        if (token) {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            req.token = decodedToken;
            if (typeof decodedToken === "string") {
                return next(new Error("Invalid"));
            }
            req.userId = decodedToken.userId;
            console.log(decodedToken);
            return next();
        }
        return next(new Error("Empty token"));
    }
    catch (err) {
        err.statusCode = 500;
        return next(err);
    }
};
exports.isAuth = isAuth;

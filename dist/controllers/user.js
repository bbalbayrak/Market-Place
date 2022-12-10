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
exports.login = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        const userExisting = yield user_1.default.findOne({ email: email });
        if (userExisting) {
            return res.status(500).json({ message: "This email already exist" });
        }
        const hashedPasswd = yield bcrypt_1.default.hash(password, 12);
        const user = new user_1.default({
            name: name,
            email: email,
            password: hashedPasswd,
            role: role,
        });
        yield user.save();
        return res
            .status(200)
            .json({ message: "User successfully created", user: user });
    });
}
exports.signUp = signUp;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            return res.status(500).json({ message: "Wrong E-mail!" });
        }
        const equalPasswd = yield bcrypt_1.default.compare(password, user.password);
        if (!equalPasswd) {
            return res.status(500).json({ message: "Wrong Password !" });
        }
        //JWT
        const token = jsonwebtoken_1.default.sign({ email: email, userId: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token: token, userId: user._id.toString() });
    });
}
exports.login = login;

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
exports.deleteMarket = exports.updateMarket = exports.hasMarket = void 0;
const user_1 = __importDefault(require("../models/user"));
function hasMarket(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const marketOwnerId = req.params.marketOwnerId;
        const marketOwner = yield user_1.default.findById(marketOwnerId);
        if (!marketOwner) {
            return res.status(404).json({ message: "Market Owner can not fount" });
        }
        if (marketOwner.role !== "marketOwner") {
            return res
                .status(400)
                .json({ message: "Only market owners can do this operation" });
        }
        return res.status(200).json({
            message: "Here is your market",
            marketName: marketOwner.marketName,
            role: marketOwner.role,
        });
    });
}
exports.hasMarket = hasMarket;
function updateMarket(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newMarketName = req.body.newMarketName;
        const marketOwnerId = req.params.marketOwnerId;
        const marketOwner = yield user_1.default.findById(marketOwnerId);
        if (!marketOwner) {
            return res.status(404).json({ message: "Market Owner can not fount" });
        }
        if (marketOwner.role !== "marketOwner") {
            return res
                .status(400)
                .json({ message: "Only market owners can do this operation" });
        }
        if (newMarketName === "") {
            return res.status(400).json({ message: "This field must be fill" });
        }
        marketOwner.marketName = newMarketName;
        try {
            yield marketOwner.save();
            res.status(201).json({
                message: "Market Name successfully updated!",
                marketName: newMarketName,
            });
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    });
}
exports.updateMarket = updateMarket;
function deleteMarket(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const marketOwnerId = req.params.marketOwnerId;
        const marketOwner = yield user_1.default.updateOne({ _id: marketOwnerId }, { $unset: { marketName: 1 } });
        if (!marketOwner) {
            return res.status(404).json({ message: "Market owner can not found!" });
        }
        return res.status(201).json({ message: "Market Name successfully deleted!" });
    });
}
exports.deleteMarket = deleteMarket;

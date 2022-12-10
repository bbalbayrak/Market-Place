"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const MONGODB_URI = process.env.API_URL;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/auth", user_1.default);
// app.use((req, res, next) => {
//   res.send("dfsdfsdf");
//   next();
// });
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(MONGODB_URI)
    .then((result) => {
    app.listen(3000);
})
    .catch((err) => console.log(err));

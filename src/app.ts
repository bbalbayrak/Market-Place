import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoute from "./routes/user";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      PORT: string;
      NODE_ENV: string;
      SECRET_KEY: string;
    }
  }
  namespace Express {
    export interface Request {
      userId: string;
    }
  }
}

const MONGODB_URI = process.env.API_URL;

const app = express();

app.use(bodyParser.json());

app.use("/auth", userRoute);


app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

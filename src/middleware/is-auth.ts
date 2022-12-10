import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const gdgd = (req: Request, res: Response, next: NextFunction): void => {
  interface CustomRequest extends Request {
    token: string | JwtPayload;
  }

  const token = req.get("Authorization")?.replace("Bearer ", "");

  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      (req as CustomRequest).token = decodedToken;
      if (typeof decodedToken === "string") {
        return next(new Error("Invalid"));
      }
      req.userId = decodedToken.userId;
      return next();
    }
    return next(new Error("Empty token"));
  } catch (err: any) {
    err.statusCode = 500;
    return next(err);
  }
};

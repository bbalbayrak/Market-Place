import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  // userRole =
};
export const isAdmin = (permission: any) => {
  const userRole = User.find({ role: "admin" });
  return (req: Request, res: Response, next: NextFunction) => {
    if (permission.includes(userRole)) {
      next();
    } else {
      return res.status(401).json({ message: "You dont have permission !" });
    }
  };
};
export const isMarketOwner = (permission: any) => {
  const userRole = User.find({ role: "marketOwner" });
  return (req: Request, res: Response, next: NextFunction) => {
    if (permission.includes(userRole)) {
      next();
    } else {
      return res.status(401).json({ message: "You dont have permission !" });
    }
  };
};

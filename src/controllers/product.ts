import { NextFunction, Request, Response } from "express";
import Product from "../models/product";

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const products = await Product.find();
  if (!products) {
    return res.status(404).json({ message: "Product can not found !" });
  }

  return res.status(200).json({
    message: "Successfully fetched!",
  });
}

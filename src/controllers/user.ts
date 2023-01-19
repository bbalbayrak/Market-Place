import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import User from "../models/user";

export async function getCart(req: Request, res: Response, next: NextFunction) {
  const userId = req.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User can not found!" });
  }
  const items = user.cart.items;

  return res
    .status(200)
    .json({ message: "There is your cart items", items: items });
}

export async function postCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const productId = req.params.productId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User can not found!" });
  }

  const userProduct = await Product.findById(productId);

  const addToCart = (product: any) => {
    const cartProductIndex = user.cart.items.findIndex((cp: any) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...user.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = user.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity,
      });
    }
    //ONLY PREMIUM
    if (
      user.role !== "premium" &&
      user.cart.items[cartProductIndex].quantity === 3
    ) {
      return res
        .status(400)
        .json({ message: "Only premium users can buy more than 3 products" });
    }

    const updatedCart = { items: updatedCartItems };
    user.cart = updatedCart;
    return user.save();
  };

  addToCart(userProduct);

  return res
    .status(201)
    .json({ message: "Added to cart !", cartItems: user.cart.items });
}

export async function premiumPostCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.productId;
  const userId = req.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User can not found !" });
  }
}

import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import User from "../models/user";

export async function getAdminProducts(
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
    products: products,
  });
}

export async function postAdminProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;

  const userId = req.userId;

  //Admin Check
  const user = await User.findById(userId);
  console.log(user);

  if (!user) {
    return res.status(404).json({ message: "User can not found" });
  }

  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Only admin can do this operation" });
  }

  const product = new Product({
    title: title,
    price: price,
    description: description,
    userId: req.userId,
  });

  try {
    await product.save();
    res
      .status(201)
      .json({ message: "Product successfully created!", product: product });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function postChangeRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const roleChangeId = req.params.userUpdate;
  const role = req.body.role;

  //ADMIN CHECK
  const adminUser = await User.findById(userId);
  if (!adminUser) {
    return res.status(404).json({ message: "User can not found" });
  }

  if (adminUser.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Only admin can do this operation" });
  }

  const user = await User.findById(roleChangeId);

  if (!user) {
    return res.status(404).json({ message: "User can not found" });
  }

  if (user.role === "admin") {
    return res
      .status(400)
      .json({ message: "One admin can not change other admins role" });
  }

  user.role = role;

  try {
    await user.save();
    res.status(201).json({ message: "User role successfully updated!" });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getChangeRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const roleChangeId = req.params.userUpdate;

  //ADMIN CHECH
  const adminUser = await User.findById(userId);
  if (!adminUser) {
    return res.status(404).json({ message: "User can not found" });
  }

  if (adminUser.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Only admin can do this operation" });
  }

  const existingUser = await User.findById(roleChangeId);

  if (!existingUser) {
    return res.status(404).json({ message: "User can not found" });
  }

  return res.status(200).json({
    message: "User successfully fetched",
    userRole: existingUser.role,
  });
}

import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  const userExisting = await User.findOne({ email: email });
  if (userExisting) {
    return res.status(500).json({ message: "This email already exist" });
  }
  const hashedPasswd = await bcrypt.hash(password, 12);

  const user = new User({
    name: name,
    email: email,
    password: hashedPasswd,
    role: role,
  });
  await user.save();
  return res
    .status(200)
    .json({ message: "User successfully created", user: user });
}
export async function login(req: Request, res: Response, next: NextFunction) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(500).json({ message: "Wrong E-mail!" });
  }
  const equalPasswd = await bcrypt.compare(password, user.password);
  if (!equalPasswd) {
    return res.status(500).json({ message: "Wrong Password !" });
  }

  //JWT
  const token = jwt.sign(
    { email: email, userId: user._id.toString() },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.status(200).json({ token: token, userId: user._id.toString() });
}

export const dataSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required !",
    }),
    email: z
      .string({
        required_error: "Email is required !",
      })
      .email({ message: "Must be a valid email" }),
    password: z
      .string({
        required_error: "Password is required !",
      })
      .min(5),
  }),
});

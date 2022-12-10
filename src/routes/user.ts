import { Router } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { login, signUp } from "../controllers/user";

const router = Router();

//User Sign Up
router.post("/signup", signUp);

//User Login
router.post("/login", login);

export default router;

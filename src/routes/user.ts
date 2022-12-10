import { Router } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { login, signUp, dataSchema } from "../controllers/user";
import validate from "../middleware/validation";

const router = Router();

//User Sign Up
router.post("/signup", signUp, validate(dataSchema));

//User Login
router.post("/login", login, validate(dataSchema));

export default router;

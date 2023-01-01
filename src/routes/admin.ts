import { Router } from "express";
// import checkIsAuth from "../middleware/authCheck";
import {
  getAdminProducts,
  postAdminProducts,
  getChangeRole,
  postChangeRole,
} from "../controllers/admin";
import verifyToken from "../middleware/authCheck";

const router = Router();

//GET ADMIN PRODUCTS
router.get("/products", verifyToken, getAdminProducts);

//POST ADMIN PRODUCTS
router.post("/add-product", verifyToken, postAdminProducts);

//ADMIN CHANGE ROLE - GET USER
router.get("/user/:userUpdate", verifyToken, getChangeRole);

//ADMIN CHANGE ROLE - POST USER
router.post("/user/:userUpdate", verifyToken, postChangeRole);

export default router;

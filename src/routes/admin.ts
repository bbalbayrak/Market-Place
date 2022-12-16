import { Router } from "express";
// import checkIsAuth from "../middleware/authCheck";
import { getAdminProducts, postAdminProducts } from "../controllers/admin";
import verifyToken from "../middleware/authCheck";

const router = Router();

//GET ADMIN PRODUCTS
router.get("/products", verifyToken, getAdminProducts);

//POST ADMIN PRODUCTS
router.post("/add-product", verifyToken, postAdminProducts);

export default router;

import { Router } from "express";
// import checkIsAuth from "../middleware/authCheck";
import { getProducts } from "../controllers/product";
import verifyToken from "../middleware/authCheck";

const router = Router();

//GET PRODUCTS
router.get("/", verifyToken, getProducts);

export default router;

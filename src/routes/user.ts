import { Router } from "express";
import { login, signUp, dataSchema } from "../controllers/auth";
import validate from "../middleware/validation";
import verifyToken from "../middleware/authCheck";
import {
  deleteMarket,
  hasMarket,
  updateMarket,
} from "../controllers/marketOwner";
import {
  addFavorite,
  deleteCart,
  deleteFavorite,
  getCart,
  getFavotire,
  postCart,
} from "../controllers/user";

const router = Router();

//User Sign Up - POST
router.post("/signup", signUp, validate(dataSchema));

//User Login - POST
router.post("/login", login, validate(dataSchema));

//MARKET OWNER OPERATIONS

//Market Owner Get Own Market - GET
router.get("/market/:marketOwnerId", verifyToken, hasMarket);

//Market Owner Change Own Market Name - POST
router.post("/market/:marketOwnerId", verifyToken, updateMarket);

//Market Owner Delete Own Market Name - POST
router.delete("/market/:marketOwnerId", verifyToken, deleteMarket);

//USER OPERATIONS

//Get Cart
router.get("/cart", verifyToken, getCart);

//Add To Cart
router.post("/cart/:productId", verifyToken, postCart);

//Delete Cart
router.delete("/cart/:productId", verifyToken, deleteCart);

//Get Favorite Product
router.get("/favorite", verifyToken, getFavotire);

//Add Favorite Product
router.post("/favorite/:productId", verifyToken, addFavorite);

//Delete Favorite Product
router.delete("/favorite/:productId", verifyToken, deleteFavorite);

export default router;

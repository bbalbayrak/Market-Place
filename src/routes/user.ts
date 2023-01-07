import { Router } from "express";
import { login, signUp, dataSchema } from "../controllers/auth";
import validate from "../middleware/validation";
import verifyToken from "../middleware/authCheck";
import {
  deleteMarket,
  hasMarket,
  updateMarket,
} from "../controllers/marketOwner";

const router = Router();

//User Sign Up - POST
router.post("/signup", signUp, validate(dataSchema));

//User Login - POST
router.post("/login", login, validate(dataSchema));

//Market Owner Get Own Market - GET
router.get("/market/:marketOwnerId", verifyToken, hasMarket);

//Market Owner Change Own Market Name - POST
router.post("/market/:marketOwnerId", verifyToken, updateMarket);

//Market Owner Delete Own Market Name - POST
router.delete("/market/:marketOwnerId", verifyToken, deleteMarket);

export default router;

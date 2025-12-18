import express from "express";
import auth from "../middlewares/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart
} from "../controllers/CartController.js";

const router = express.Router();

router.get("/", auth, getCart);
router.post("/", auth, addToCart);
router.put("/update", auth, updateCart);
router.delete("/remove/:productId", auth, removeFromCart);

export default router;

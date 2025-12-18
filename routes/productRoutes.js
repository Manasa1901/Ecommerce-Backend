import express from "express";
import { getAllProducts, getProductById } from "../controllers/ProductController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;




// import express from "express";
// import Product from "../models/Product.js";

// const router = express.Router();

// // GET all products
// router.get("/", async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // GET by ID
// router.get("/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   res.json(product);
// });

// // ADD product
// router.post("/", async (req, res) => {
//   const newProd = new Product(req.body);
//   await newProd.save();
//   res.json({ message: "Product added", newProd });
// });

// // UPDATE product
// router.put("/:id", async (req, res) => {
//   const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

// // DELETE product
// router.delete("/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// });

// export default router;

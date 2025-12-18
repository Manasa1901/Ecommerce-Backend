import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js";
import User from "./models/User.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: 'https://ecommerce-frontend-ebon-nine.vercel.app', credentials: true }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes)
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.get("/profile",authMiddleware,async(req,res)=>{
    const user = await User.findById(req.userData.id).select("-password")
    res.status(200).json({message:"Profile",userData:user});
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);

import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/* ================= GET CART ================= */
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userData.id })
    .populate("products.product");

  if (!cart) {
    return res.json({ cart: { products: [] }, summary: { originalTotal: 0, sellingTotal: 0, discount: 0, shipping: 20, grandTotal: 20 } });
  }

  // Calculate summary
  let originalTotal = 0;
  let sellingTotal = 0;
  cart.products.forEach(item => {
    const prod = item.product;
    originalTotal += prod.originalPrice * item.quantity;
    sellingTotal += prod.price * item.quantity;
  });
  const shipping = 20;
  const discount = originalTotal - sellingTotal;
  const grandTotal = sellingTotal + shipping;

  const summary = { originalTotal, sellingTotal, discount, shipping, grandTotal };

  res.json({ cart, summary });
};

/* ================= ADD TO CART ================= */
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userData.id;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      products: [{ product: productId, quantity }],
    });
    return res.json({ cart });
  }

  const existing = cart.products.find(
    (p) => p.product.toString() === productId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  res.json({ cart });
};

/* ================= UPDATE CART ================= */
const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userData.id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.products.find(
    (p) => p.product.toString() === productId
  );

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;
  await cart.save();

  res.json({ cart });
};

/* ================= REMOVE FROM CART ================= */
const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.userData.id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.products = cart.products.filter(
    (p) => p.product.toString() !== productId
  );

  await cart.save();
  res.json({ cart });
};

export { getCart, addToCart, updateCart, removeFromCart };

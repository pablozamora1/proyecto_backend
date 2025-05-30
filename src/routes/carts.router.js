import express from "express";
const router = express.Router();

import ProductManager from "../controllers/ProductManager.js";
const productManager = new ProductManager("./models/cart.json");

router.get("/carts", async (req, res) => {
  try {
    const carts = await productManager.readFlies();
    res.json(carts);
  } catch (error) {
    console.log(error);
    console.log("Error al obtener el carrito ", error);
    return res.json({ error: "error del servidor" });
  }
});

export default router;

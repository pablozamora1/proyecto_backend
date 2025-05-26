import express from "express";
const router = express.Router();

import ProductManager from "../controllers/ProductManager.js";
const productManager = new ProductManager("../models/products.json");

router.get("/", async (req, res) => {
  try {
    const allProducts = await productManager.getProducts();
    let limit = parseInt(req.query.limit);
    if (limit) {
      const productLimit = allProducts.slice(0, limit);
      return res.send(productLimit);
    } else {
      return res.send(allProducts);
    }
  } catch (error) {
    console.log("Error al obtener los productos ", error);
    return res.json({ error: "error del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let allProducts = await productManager.getProducts();
    const productById = await allProducts.find((item) => item.id === id);

    if (productById) {
      res.send(productById);
    } else {
      res.send("producto no encontrado");
    }
  } catch (error) {
    console.log(error);
    return res.send("error al procesar la solicitud");
  }
});

export default router;

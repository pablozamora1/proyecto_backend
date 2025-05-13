import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager("./products.json");
const readProducts = manager.readFlies();

const PUERTO = 8080;

app.get("/products", async (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!limit) return res.send(await readProducts);
  let allProducts = await readProducts;
  let productLimit = allProducts.slice(0, limit);
  res.send(productLimit);
});

app.get("/products/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let allProducts = await readProducts;
  const productById = await allProducts.find((item) => item.id === id);

  if (productById) {
    res.send(productById);
  } else {
    res.send("producto no encontrado");
  }
});

app.listen(PUERTO, () => {
  console.log(`escuchando en el http://localhost:${PUERTO}/products`);
});

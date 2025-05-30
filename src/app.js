import express from "express";
const app = express();
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
const PUERTO = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

app.listen(PUERTO, () => {
  console.log(`escuchando en el http://localhost:${PUERTO}`);
});

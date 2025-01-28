import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
const port = 8080; 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, ()=>console.log("El servidor se levanto correctamente!!!"));

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);




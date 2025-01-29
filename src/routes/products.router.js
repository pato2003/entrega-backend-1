import { Router } from "express";
import ProductManager from "../clases/productManager.js";

const router = Router();
const pm = new ProductManager();

router.get('/', (req, res)=>{
    let limit = req.query.limit || null;
    let products = pm.getProducts(limit);
    res.send({products});
});

router.get('/:pid', (req, res)=>{
    let pid = req.params.pid;
    let product = pm.getProductById(pid);
    if (product) {
        res.send({ product });
    } else {
        res.send({"estado": "ERROR", "mensaje": "No existe ningun producto en ese identificador"});        
    }
});

router.post('/', (req, res)=>{
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;
    let product = {title, description, code, price, status, stock, category, thumbnails};
    if (pm.addProduct(product)) {
        res.send({"estado": "OK", "mensaje": "El producto se agrego correctamente"}) 
    } else {
        res.send({"estado": "ERROR", "mensaje": "No se pudo agregar el producto"});        
    }
});

router.put('/:pid', (req, res)=>{
    let pid = req.params.pid;
    let newProduct = req.body;
    if(pm.updateProduct(pid, newProduct)){
        res.send({"estado": "OK", "mensaje": "El producto se actualizo correctamente"});
    }else{
        res.send({"estado": "ERROR", "mensaje": "No se pudo modificar el producto"});        
    }
});

router.delete('/:pid', (req, res)=>{
    let pid = req.params.pid;
    if(pm.deleteProduct(pid)){
        res.send({"estado": "OK", "mensaje": "El producto se elimino correctamente"});
    }else{
        res.send({"estado": "ERROR", "mensaje": "No se pudo eliminar el producto"});        
    }
});

export default router;

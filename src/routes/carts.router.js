import { Router } from "express";
import CartsManager from "../clases/cartsManager.js";

const router = Router();
const cm = new CartsManager();

router.post('/', (req,res)=>{
    if(cm.addCart()){
        res.send({"estado" : "OK", "mensaje" : "El carrito se creo correctamente"});
    }else{
        res.status(404).send({"estado" : "ERROR", "mensaje" : "El carrito no se pudo crear"});

    }
});

router.get('/:cid', (req, res)=>{
    let cid = req.params.cid;
    let cart = cm.getCartById(cid);
    if(!cart){
        res.status(404).send({"estado" : "ERROR", "mensaje" : "No se encontró ningun carrito con ese id"});
    }else{

        res.send({cart})
    }
});

router.post('/:cid/product/:pid', (req,res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    if(cm.addProduct(cid, pid)){
        res.send({"estado" : "OK", "mensaje" : "El producto se agrego correctamente"});
    }else{
        res.status(404).send({"estado" : "ERROR", "mensaje" : "El producto no se ha podido agregar"});

    }
});


export default router;

import { Router } from "express";

const router = Router();
let products = [
    {id:1,nombre:'cocacola'},
    {id:2,nombre:'sprite'},
    {id:3,nombre:'sevenup'},
    {id:4,nombre:'pepsi'}
];

router.get('/', (req, res)=>{
    let limit = req.query.limit;
    if (!limit) {
        return res.send({products})
    }
    let limitedProducts = products.slice(0,limit);
    res.send({ limitedProducts });
});

router.get('/:id', (req, res)=>{
    let id = req.params.id;
    let product = products.find(product=>product.id == id); 
    res.send({ product })
});

router.post('/', (req, res)=>{
    let body = req.body;

});

export default router;

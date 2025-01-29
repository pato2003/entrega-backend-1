import  fs  from "node:fs";

class CartsManager {
    constructor() {
        this.carts =[],
        this.fileName = 'carts.json',
        this.createFile()        
    }

    getCartById(cid){
        this.getCarts();
        let cart = this.carts.find(cart=>cart.id == cid);

        return cart ? cart.products : null;
    }

    getCarts(){
        this.carts = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));

        return this.carts;
    }

    createFile(){
        if(!fs.existsSync(this.fileName)){
            fs.writeFileSync(this.fileName, JSON.stringify(this.carts));
        }
    }

    addCart(){
        this.getCarts();
        let cid = this.carts.length;
        this.carts.push({id: ++cid, products: []});
        return this.saveFile();

    }

    saveFile(){
        return fs.writeFileSync(this.fileName, JSON.stringify(this.carts));        
    }

    addProduct(cid, pid){
        this.getCarts();
        this.carts = this.carts.map(cart => {
            if (cart.id == cid) {
                if (cart.products.some((product)=>product.id==pid)) {
                    cart.products.map(product =>{
                        if (product.id==pid) {
                            ++product.quantity;
                        }
                        return product
                    })
                }else{
                    cart.products.push({id:parseInt(pid), quantity: 1});
                }
            }
            return cart
        });
        return this.saveFile();
    }

}

export default CartsManager;
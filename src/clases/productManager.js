import  fs  from "node:fs";

class ProductManager {
    constructor() {
        this.products =[],
        this.fileName = 'products.json',
        this.createFile()        
    }

    getProductById(pid){
        this.products = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        let product = this.products.find(product=>product.id == pid);
        return product ? product : null;
    }

    getProducts(limit){
        this.products = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));

        return !limit ? this.products : this.products.slice(0,limit)
    }

    createFile(){
        if(!fs.existsSync(this.fileName)){
            fs.writeFileSync(this.fileName, JSON.stringify(this.products));
        }
    }

    addProduct(product){
        this.getProducts();
        let pid = this.products.length;
        this.products.push({id: ++pid, ...product});
        return this.saveFile();

    }

    saveFile(){
        return fs.writeFileSync(this.fileName, JSON.stringify(this.products));        
    }

    updateProduct(pid, newProduct){
        this.getProducts();
        this.products = this.products.map(product => {
            if (product.id == pid) {
                product = {...product, ...newProduct, id: product.id};
            }
            return product
        });
        return this.saveFile();
    }

    deleteProduct(pid){
        this.getProducts();
        this.products = this.products.filter(product => product.id!=pid);
        return this.saveFile();
    }
}

export default ProductManager;
export class Product {

    idProduct?: number;
    nameProduct:string;
    stock:number;
    price:number;
    state:number;
    
    constructor( nameProduct: string, stock: number, price: number, state: number) {
        this.nameProduct = nameProduct;
        this.stock = stock;
        this.price = price;
        this.state = state;
    }
}

import { Contact } from "./contact";
import { Product } from "./product";

export class Reserve {
   
    idOrder?: number;
    state: number;
    totalCost: number;
    date:string;
    products:Product[];
    id_user:number;

    constructor( state: number, totalCost: number, date:string,products:Product[],id_user:number) {
        this.state = state;
        this.totalCost = totalCost;
        this.date=date;
        this.products=products;
        this.id_user=id_user;
    }
}
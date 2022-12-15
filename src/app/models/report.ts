import { Contact } from "./contact";
import { Product } from "./product";

export class Report {
    idReport?: number;
    title: string;
    description: string;
    date:string;
    state:number;
    id_user:number;

    constructor( title: string, description: string, date:string,state:number,id_user:number) {
        this.title = title;
        this.description = description;
        this.date=date;
        this.state=state;
        this.id_user=id_user;
    }


}
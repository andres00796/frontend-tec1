import { Contact } from "./contact";

export class User {
    id_user?: number;
    name: string;
    contact:Contact[];
    

    constructor( name: string, contact: Contact[]) {
        this.name = name;
        this.contact=contact;
    }
}
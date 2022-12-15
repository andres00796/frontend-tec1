import { Contact } from "./contact";

export class User {
    id_user?: number;
    name: string;
    firstName: string;
    lastName:string;
    
    state:number;
    idRol:number

    constructor( name: string, firstName: string, lastName:string,state:number,idRol:number, ) {
        this.name = name;
        this.firstName = firstName;
        this.lastName=lastName;
      
        this.state=state;
        this.idRol=idRol;
    }
}
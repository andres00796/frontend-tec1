export class NewUser {
    
    name:string;
    
    password:string;

    firstName: string;
    
    lastName:string;
    
    idRol:number

    constructor(name:string, password:string, firstName:string, lastName:string, idRol:number)
    {
        this.name = name;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.idRol = idRol;
    }
}

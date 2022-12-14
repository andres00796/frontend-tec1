export class Contact {
    id_contact?: number;
    name: string;
    phone: string;
    relationship: string;
    user?:number;

    constructor( name: string, phone: string, relationship: string) {
        this.name = name;
        this.phone = phone;
        this.relationship = relationship;
    }
}
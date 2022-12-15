import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isLogged(): boolean
  {
    if(this.getToken()){
      return true;
    }
    return false;
  }
  setToken(token: string): void{
    localStorage.setItem('token',token);
  }
  
  getToken(){
    return localStorage['token'];
   }

   getNameUser():string{
    if(!this.isLogged()){
      return 'Mundo';
      }
     let token=this.getToken();
     const payload=token.split('.')[1];
     const values= atob(payload);
     const values_json= JSON.parse(values);
     const name_user = values_json.name;
     localStorage['id_user']=values_json.id;
     localStorage['rolUser']=values_json.rol
     return name_user;
   }

   isAdmin():boolean{
     if(!this.isLogged())
     {
        return false;
     }
      const token=this.getToken();
      const payload=token.split('.')[1];
      const values= atob(payload);
      const values_json= JSON.parse(values);
      const name_user = values_json.name;
      const roles = values_json.rols;
      console.log(name_user);
      console.log(roles);
      if(roles.indexOf('admin')<0){
        return false;
      }
      return true;
   }
productCart:Product[]=[]
   logOut():void{
    let id = localStorage['id_user']
    let cart = localStorage.getItem("cart-"+id)
    this.productCart = JSON.parse(cart);
     localStorage.clear();
     let carritoJSON = JSON.stringify(this.productCart);
      localStorage.setItem("cart-"+id, carritoJSON);
   }

}

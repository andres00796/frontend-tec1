import { Component } from '@angular/core';

import { TokenService } from '../services/token.service';
import { Product } from 'src/app/models/product';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nameUser:string="";
  items:string[]=['auto','reloj','computadora']
  products: Product[]=[
    {id_product:0, nameProduct:'iPhone XS Max',stock:10,price:700,state:1},
    {id_product:1,nameProduct:'Samsung S22 Ultra',stock:15,price:350,state:1},
    {id_product:2,nameProduct:'Laptop Asus',stock:9,price:1700,state:1},
    {id_product:3,nameProduct:'Sony 55 in.',stock:7,price:460,state:1},
    {id_product:4,nameProduct:'Case Iphone 12',stock:124,price:10,state:1},
    {id_product:5,nameProduct:'iPhone XS Max',stock:10,price:700,state:1},
    {id_product:6,nameProduct:'Samsung S22 Ultra',stock:15,price:350,state:1},
    {id_product:7,nameProduct:'Laptop Asus',stock:9,price:1700,state:1},
    {id_product:8,nameProduct:'Sony 55 in.',stock:7,price:460,state:1},
    {id_product:9,nameProduct:'Case Iphone 12',stock:124,price:10,state:1},
    {id_product:10,nameProduct:'iPhone XS Max',stock:10,price:700,state:1},
    {id_product:11,nameProduct:'Samsung S22 Ultra',stock:15,price:350,state:1},
    {id_product:12,nameProduct:'Laptop Asus',stock:9,price:1700,state:1},
    {id_product:13,nameProduct:'Sony 55 in.', stock:7, price:460, state:1},
    {id_product:14,nameProduct:'Case Iphone 12', stock:124, price:10, state:1},
    {id_product:15,nameProduct:'iPhone XS Max', stock:10, price:700, state:1},
    {id_product:16,nameProduct:'Samsung S22 Ultra', stock:15,price:350, state:1},
    {id_product:17,nameProduct:'Laptop Asus', stock:9, price:1700, state:1},
    {id_product:18,nameProduct:'Sony 55 in.', stock:7, price:460, state:1},
    {id_product:19,nameProduct:'Case Iphone 12', stock:124, price:10, state:1},
  ]
  dolar: number = 6.96;

  //nameProduct: string, stock: number, price: number, state: number

  constructor(
    public navCtrl: NavController,
    private token_service: TokenService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.nameUser=this.token_service.getNameUser();
  }

  seeProduct(id:number){
    this.navCtrl.pop()
    console.log(id)
    localStorage.setItem('detail-product', id+'')
    this.router.navigate(['/detail-product'])

  }

}

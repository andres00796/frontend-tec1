import { Component } from '@angular/core';

import { TokenService } from '../services/token.service';
import { Product } from 'src/app/models/product';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nameUser:string="";
  items:string[]=['auto','reloj','computadora']
 
  productos: Product[];
  dolar: number = 6.96;
  list_empty=undefined;
  

  options: boolean = false;
  category: string;
  condition: string;
  office: string;
  selectPositionCategory: number;
  selectPositionState: number;
  selectPositionOffice: number;

  valueParametro: string = "";
  valueCategory: string;
  valueCondition: string;
  valueOffice: string;
  //officeList: ISucursalSimple[];
  msg: number;
  data: any[] = Array(2);
  listProducts: Product[] = [];
  //paramsSearch: IParaBusquedaAvanzadaProductos;

  constructor(
    public navCtrl: NavController,
    private token_service: TokenService,
    private router:Router,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.getListProduct();
    this.nameUser=this.token_service.getNameUser();
  }

  seeProduct(id:number){
    this.navCtrl.pop()
    console.log(id)
    localStorage.setItem('detail-product', id+'')
    this.router.navigate(['/detail-product'])

  }

  getListProduct():void{
    
      this.productService.lista().subscribe(
        data => {
          console.log(data);
          this.productos = data;
          this.list_empty = undefined;
        },
        err => {
          this.list_empty = err.error.message;
        }
      );
    
  }


}

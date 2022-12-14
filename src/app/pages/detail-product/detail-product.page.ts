import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  id:number = localStorage['detail-product'];
  product: Product
  listSrcImages:string[]=['./assets/img/0/0.jpg','./assets/img/0/1.jpg']
  role: string = 'user'
  permission: boolean = true

  constructor() { }

  ngOnInit() {
    this.role=='admin'?this.permission=true:this.permission=false
    console.log(this.id)
  }

  getProduct(){
    this.id;
  }
  slideChange(){

  }
  share(){

  }
  goBack(){

  }
}

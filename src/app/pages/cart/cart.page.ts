import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TakePhotoComponent } from 'src/app/Components/take-photo/take-photo.component';
import { Product } from 'src/app/models/product';
import { Reserve } from 'src/app/models/reserve';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {


  products:Product[]=[]

  productSearch:Product
  
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
  productCart: Product[] = [];
  
  public results:Product[] ;

  permissionAdmin:string=localStorage['rolUser']
  idUser:number=localStorage['id_user']
  totalPrice:number=0;



  constructor(
    private order_service:OrderService,
    private router: Router,
   
  ) { }

  ngOnInit() {

    if(localStorage["cart-"+this.idUser]){
      let cart = localStorage.getItem("cart-"+this.idUser);
      this.productCart = JSON.parse(cart);
    }
    for (let product of this.productCart){
      this.totalPrice+= product.price;
    }
  }

  deleteProductCart(idProduct:number){

    let indiceZapatos = this.productCart.findIndex((producto) => producto.idProduct === idProduct);
    
    if(localStorage["cart-"+this.idUser]){
      let cart = localStorage.getItem("cart-"+this.idUser);
      this.productCart = JSON.parse(cart);
      this.productCart.splice(indiceZapatos, 1);
      let carritoJSON = JSON.stringify(this.productCart);
      localStorage.setItem("cart-"+this.idUser, carritoJSON);
    }
    this.totalPrice=0;
    for (let product of this.productCart){
      this.totalPrice+= product.price;
    }
  }
 reserve:Reserve;
  sendReserve(){
    this.reserve=new Reserve(1,this.totalPrice, '2022-12-15',this.productCart,this.idUser)
    this.order_service.save(this.reserve).subscribe(
      data => {
        if(this.permissionAdmin){
        this.router.navigate(['/home']);
      }else
      {
          this.router.navigate(['/home']);
        }
      }, err =>{    
      }
    )
    
    }

  }





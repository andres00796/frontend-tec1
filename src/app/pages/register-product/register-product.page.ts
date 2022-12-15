import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.page.html',
  styleUrls: ['./register-product.page.scss'],
})
export class RegisterProductPage implements OnInit {

  //idProduct?: number;
  nameProduct:string;
  stock:number;
  price:number;
  state:number;
  coint:string;
  totalPrice:number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  addProduct():void{
    
    if(this.coint=='0'){
      this.totalPrice= this.price/6.96
    }
    else{
      this.totalPrice=this.price
    }
    if(!this.coint){
      alert("selecciona un tipo de cambio por favor")
    
    
  }
  else{
    const product = new Product(this.nameProduct, this.stock, this.totalPrice,1);

    this.productService.save(localStorage['id_user'],product).subscribe(
      data => {
        this.toast("Se creo correctamente el producto","success");
          //timeOut: 3000, positionClass: 'toast-top-center'
       // });
        this.volver();
      },
      err => {
        this.toast("No creo correctamente el producto, intente mas tarde.","danger");
       // this.toastr.error(err.error.message, 'Fail', {
         // timeOut: 3000,  positionClass: 'toast-top-center',
        //});
      }
    );
  }
  }
  async toast(message:string, color:string)
{ 
  const msg = await this.toastController.create(
    {
      message: message,
      duration: 3000,
      position: 'bottom',
      color:''+color
    }
  ) 
  msg.present();
}
volver(): void {
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['list-product']));
}

}

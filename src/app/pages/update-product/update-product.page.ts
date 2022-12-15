import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PickerController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {

 
  id:number = localStorage['detail-product'];
  product: Product
  //idProduct?: number;
  nameProduct:string="";
  stock:number=0;
  price:number=0;
  state:number=0;
  coint:string='1';
  totalPrice:number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private pickerController: PickerController,
  ) { }

  ngOnInit() {
    this.getProduct();
    console.log(this.product);
    
   

    
  }

  getProduct(){


    const idProduct =localStorage['detail-product'];
  
    this.productService.detail(idProduct).subscribe(
       data => {
        console.log(data)
         this.product = data;
         this.nameProduct = data.nameProduct;
         this.stock=this.product.stock;
         this.price=this.product.price;
       },
       err => {
         //this.toastr.error(err.error.message, 'Fail', {
          // timeOut: 3000,  positionClass: 'toast-top-center',
        //});
         
       }
     );
  }
   
  updateProduct():void{
    
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

    this.productService.update(localStorage['detail-product'],product).subscribe(
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

async selectCoint() {
  const picker = await this.pickerController.create({
    mode: 'ios',
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
        },
      },
      {
        text: 'Confirmar',
        handler: (selected) => {

          this.coint=(selected.coint.value);
          console.log(this.coint)
        },
      }
    ],
    columns: [
      {
        selectedIndex: 2,
        name: 'coint',
        options:  [
          {text: 'Bolivianos' , value: '0'},
          {text: 'Dolar' , value: '1'},
        ]
      }
    ]
  });
  await picker.present();
}
}

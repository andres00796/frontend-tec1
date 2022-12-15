import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TakePhotoComponent } from 'src/app/Components/take-photo/take-photo.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  id:number = localStorage['detail-product'];
  product: Product;
  listSrcImages:string[]=['./assets/img/0/0.jpg','./assets/img/0/1.jpg']
  role: string = localStorage['rolUser'];
  permission: boolean = true;
  state: number;
  productCart:Product[]=[];
  idUser:number=localStorage['id_user']


  constructor(
    private activatedRoute: ActivatedRoute,
    private productService:ProductService,
    private router: Router,
    private readonly modalController: ModalController,
  ) { }

  ngOnInit() {
    this.getProduct();
    this.role=='admin'?this.permission=true:this.permission=false
    
  }

  updateProduct(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['update-product']));
  }
getProduct(){


  const idProduct =localStorage['detail-product'];

  this.productService.detail(idProduct).subscribe(
     data => {
      console.log(data)
       this.product = data;
     },
     err => {
       //this.toastr.error(err.error.message, 'Fail', {
        // timeOut: 3000,  positionClass: 'toast-top-center',
      //});
       
     }
   );
}
 
  slideChange(){

  }
  share(){

  }
  goBack(){

  }


  addCart(idProduct:number){
    
    console.log('producto visto')
    console.log(this.product)

      if(localStorage["cart-"+this.idUser]){
        let cart = localStorage.getItem("cart-"+this.idUser);
        this.productCart = JSON.parse(cart);
        this.productCart.push(this.product);
        let carritoJSON = JSON.stringify(this.productCart);
        localStorage.setItem("cart-"+this.idUser, carritoJSON);
      }else{
        this.productCart[0]=this.product;
        let carritoJSON = JSON.stringify(this.productCart);
        localStorage.setItem("cart-"+this.idUser, carritoJSON);
      }
  }

  
  async takePhoto() {
    const modal = await this.modalController.create({
      component: TakePhotoComponent,  
      componentProps:{
        producto: this.product
      }    
    });
    return await modal.present();
  }

}

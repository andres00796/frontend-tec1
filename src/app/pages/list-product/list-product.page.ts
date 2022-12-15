import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
})
export class ListProductPage implements OnInit {

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
  listProducts: Product[] = [];
  public results:Product[] ;

  permissionAdmin:string=localStorage['rolUser']
  //http://localhost:2000/api
  public readonly baseUrlImages: string = 'http://localhost:2000/api' + '/files/' ;

  constructor(
    private router:Router,
    public navCtrl: NavController,
    private productService:ProductService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.listProduct();
  }
  
  listProduct(): void {
    this.productService.lista().subscribe(
      data => {
        this.products = data;
        this.filterProduct=this.products
      },
      err => {
      }
    );
  }

  seeProduct(id:number){
    this.navCtrl.pop()
    localStorage.setItem('detail-product', id+'')
    this.router.navigate(['/detail-product'])

  }

  addProduct():void{
    
    this.router.navigate(['/register-product']);
  
  }
  deleteProduct(idProduct:number):void{
    this.productService.delete(idProduct).subscribe(
      data => {
        this.products = data;
        this.router.navigate(['/list-product']);
        this.toast("Se elimino correctamente el producto.","success");

      },
      err => {
        this.toast("No se elimino correctamente el producto, intente mas tarde.","danger");
      }
    );
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
  
  search() {
    
    this.productSearch.nameProduct=this.valueParametro;
    this.productService.searchProduct(this.productSearch)
  
        .subscribe(data => {
  
              this.products = data;
         
  
        }, (err) => {
  
  
        });
    
    this.listProducts = [];

    localStorage.setItem("searchItem",this.valueParametro);

   
    
    }
    
  
    filterProduct:Product[];
    value:string;
    handleChange(event) {

      this.filterProduct = this.products.filter(products => products.nameProduct.toLowerCase().includes(this.value));
      
    }

}

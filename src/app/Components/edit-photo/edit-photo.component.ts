import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
//import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ImageCompressorService } from 'src/app/services/image-compressor.service';
import { ProductService } from 'src/app/services/product.service';
import { VariableService } from 'src/app/services/variable.service';
import { TakePhotoComponent } from '../take-photo/take-photo.component';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss'],
})
export class EditPhotoComponent implements OnInit {

 
  @Input() producto:Product;
  @Input() imageBase64:string;

  imageChangedEvent: any = '';
  canvasRotation = 0;
  transform: ImageTransform = {};

  corteAplicado: boolean;
  // imageChangedEvent: any = '';
  croppedImage: any = '';
  imagenRecortadaLista: any = '';


  constructor(
    private zone: NgZone,
    private readonly compressorService: ImageCompressorService, 
    private readonly modalController: ModalController,
    private readonly productService:ProductService,
    //private readonly loadingService: LoadingService,
   //private readonly toastService: ToastrService,
    private readonly variableservice:VariableService,
    private readonly nvr:NavController
  ) { }

  ngOnInit() {}


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  rotateRight() {
    // console.log('ingreso a rotate');
    //this.loading = true;
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    });
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };

    // console.log('saliendo de flipAfertRotate');
  }

  imageCropped(event: ImageCroppedEvent) {
    // esto se dispara cuando la imagen es cortada...
    // al ser base64 es lo que me sirve para enviar al servidor

    this.croppedImage = event.base64;
    // console.log('imagen cortada:', this.croppedImage);
  }

  //cuando se carga una imagen al recortador
  // imageLoaded(image: LoadedImage) {
  //   // show cropper
  // }

  cropperReady() {
    // cropper ready
    // esto se dispara cuando la imagen esta lista para ser recortada...
  }
  loadImageFailed() {
    // show message
  }

  //=================================

  getImageBase64String(): string {    
    return this.imageBase64;

  }

  corteFinalizado() {
    // aca aplicar la compresion de la imagen y depositarla en imagenRecortadaLista
    //this.imagenRecortadaLista = this.croppedImage;
    this.comenzarProcesoComprimirImagen(this.croppedImage);
    this.corteAplicado = true;
  }

  volverACortar() {
    this.corteAplicado = false;
  }


  async irAtras() {
    //FREDDY IMPLEMENTAR
    //ESTO DEBERIA VOLVER A ABRIR LA CAMARA PARA TOMAR FOTO

    // this.location.back();
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: TakePhotoComponent,  
      componentProps:{
        producto: this.producto
      }    
    });
    return await modal.present();
  }

  guardarImagenEnServer(image: any) {
   
    //this.loadingService.present('Esperando respuesta');
    this.productService.uploadImage(image,localStorage['detail-product'])
    .subscribe((response: any) => {
      //this.loadingService.dismiss();
      // const { data } = response;
      //this.toastService.present('Imagen guardada', 3000);
      console.log(response);
      this.modalController.dismiss();
      this.variableservice.filter('click');

    }, (err) => {

      //this.loadingService.dismiss();

      const { error } = err;
      if (error.message) {
      //  this.toastService.present(error.message, 3000);
      } else {
      //  this.toastService.present('Error de conexion!', 3000);
      }

    });

    //FREDDY IMPLEMENTAR

    // this.protectedService.uploadImage(image, this.protectedService.productoActual.id).subscribe(
    //   result => {       
    //     this.zone.run(() => {
    //       this.getImages(this.protectedService.productoActual.id);
    //       this.router.navigateByUrl('/dashboard');
    //     });
    //   }
    // );
  }

  getImages(idProduct: string) {
    //VER SI CORRESPONDE IMPLEMENTAR

    // this.protectedService.getImagesByIDProduct(idProduct).subscribe(result => {
    //   this.protectedService.listaImagenes = result;
    // });
  }

 
  comenzarProcesoComprimirImagen(imagen: any) {
    this.transformarYcomprimir(imagen);
  }

  transformarYcomprimir(base64: any) {   
    
    let myFile = this.compressorService.base64URLtoFile(base64, "algo.jpeg");    
    this.comprimirImagen(myFile);
  }

  comprimirImagen(file: File) {

    this.compressorService.compressImage(file).subscribe(result => {      
      this.fileToImage64(result);
    });
  }

  fileToImage64(file: File) {
    this.compressorService.fileToBase64(file).subscribe(result => {      
      
      this.zone.run(() => {
        this.imagenRecortadaLista = result;
      });  

    });
  }


}

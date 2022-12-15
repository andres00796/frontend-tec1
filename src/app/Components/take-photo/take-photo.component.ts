import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { EditPhotoComponent } from '../edit-photo/edit-photo.component';

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.component.html',
  styleUrls: ['./take-photo.component.scss'],
})
export class TakePhotoComponent implements OnInit {

  @Input() product:Product;

  imagenTemp:any;
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public availableDevices:MediaDeviceInfo[];
  public primeraCargaPagina:boolean=true;

  public get videoOptions(): MediaTrackConstraints {
    //you can set ideal,min,max for width and height
    const result: MediaTrackConstraints = {
      width: { min: 800, ideal: 1920 },
      height: { min: 600, ideal: 1080 }
    };
    return result;
  }

  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(
    private readonly modalController: ModalController,
  ) { }

  // ngOnInit(

  // ) {}

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        console.log('C');
        this.availableDevices = mediaDevices;
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }



  public triggerSnapshot(): void {
    this.trigger.next();
    //console.log(this.webcamImage.imageAsDataUrl);
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    console.log('A');
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    //console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.pasarImagenParaRecortar();
    //console.log('data url:',this.webcamImage.imageAsDataUrl);
    //this.protectedService.base64ToBlob(this.webcamImage.imageAsDataUrl);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('B');
    //console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
    this.ponerCamaraIdeal();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }



  irAtras(){
    
    this.modalController.dismiss();
  }

  //pasarImagenParaRecortar() {    
    //this.pasarAEditarImagen();
// FREDDY IMPLEMENTAR ESTA FUNCION!

    // this.protectedService.imageBase64 = this.webcamImage.imageAsDataUrl
    // console.log('foto tomada enviar a para cortar:',this.protectedService.imageBase64);
    // this.router.navigateByUrl('/dashboard/cropimage');

     
    
  //}

  ponerCamaraIdeal(){
       
 
    if (this.primeraCargaPagina==false){
       return;
    }
 
     this.availableDevices.forEach(element => {
       let nombreCam:string = element.label; 
       //alert(nombreCam);     
       if (nombreCam.includes('2 0')){
 
        // alert('cumple');  
         //this.deviceCurrent = element;
         this.deviceId = element.deviceId;
         this.nextWebcam.next(this.deviceId);
         this.primeraCargaPagina=false;
         return;
       }
      
     });
    
     //return this.deviceCurrent;
   }

   async pasarImagenParaRecortar() {
     
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component:EditPhotoComponent,
       componentProps:{
         producto: this.product,
         imageBase64:this.webcamImage.imageAsDataUrl,
       }    
    });
    return await modal.present();
  }

  

}

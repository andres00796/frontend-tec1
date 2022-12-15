import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {WebcamModule} from 'ngx-webcam';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormsModule } from '@angular/forms';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';


@NgModule({
    declarations: [

      TakePhotoComponent,
      EditPhotoComponent,
 
    ],
    imports: [
      CommonModule,
      IonicModule,
      WebcamModule,
      ImageCropperModule,    
      ZXingScannerModule,
      FormsModule,
    ],
    exports:[
      TakePhotoComponent,
      EditPhotoComponent,
      
    ]
  })
  export class ComponentsModule { }
  
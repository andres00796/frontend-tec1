import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

  import Compressor from 'compressorjs';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressorService {

  
  constructor() { }

  compressImage(file: File): Observable<File> {

    //console.log('ingreso', file);
    const emitter = new EventEmitter<File>();


    const compressor = new Compressor(file, {

      quality: 0.9,
      success(blobResult) {
        const compressedFile = new File([blobResult], file.name, { type: file.type, lastModified: Date.now() });
        //console.log('Finalizo', compressedFile);

        emitter.emit(compressedFile);
      },
      error(err) {
        console.log(err.message);
      }
    });

    return emitter.asObservable();
  }


  fileToBase64(file: File) {

    return new Observable((subscriber) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        subscriber.next(reader.result)

        // console.log('base64:', reader.result);
      };
    });
  }

  base64URLtoFile(base64, filename) {

    var arr = base64.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}

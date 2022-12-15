import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productURL = 'http://localhost:3030/product/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.productURL}`);
  }

  public listById(id:number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.productURL}${id}/${id}`);
  }

  public detail(idProduct: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.productURL}${idProduct}`);
  }

  public save(id_user:number,contact: Product): Observable<any> {
    return this.httpClient.post<any>(`${this.productURL}${id_user}`, contact);
  }

  public update( idProduct:number,product?: Product): Observable<any> {
    return this.httpClient.put<any>(`${this.productURL}${idProduct}`, product);
  }

  public delete(idProduct?: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.productURL}${idProduct}`);
  }

  public searchProduct(product:Product):Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.productURL}${product}`);
  }
  baseURL = 'http://localhost:3030/file'
  uploadImage(file, idProduct: string) {  
    //let usuario = this.variablesService.getUsuarioActual();  
    // console.log('Se recibio esta imagen:',file);
    file = this.convertBase64ToBlob(file);

    const url = `${this.baseURL}/files/upload/img`;
    const headers = new HttpHeaders({
      
      'Authorization': `Bearer ${localStorage['token']}`
    })

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("idProduct", idProduct);
    //formData.append("image", file, 'hellomoto');   
    formData.append("image", file,'image.jpg');

    // tengo que ver como hacer esta parte body debe ser par de key value... segun yo aqui hay un problema...
    //const body = { idProduct: idProducto,image:file };

    //return this.http.post(url, formData, { headers });
    // return this.http.post(url,{ headers });
    return this.httpClient.post(url,formData,{ headers });

  }

  private convertBase64ToBlob(base64Image: string) {
    // Split into two parts
    const parts = base64Image.split(';base64,');

    // Hold the content type
    const imageType = parts[0].split(':')[1];

    // Decode Base64 string
    const decodedData = window.atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }
}

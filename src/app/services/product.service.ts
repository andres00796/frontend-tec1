import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {HttpClient} from '@angular/common/http';
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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report';
import { Reserve } from '../models/reserve';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  productURL = 'http://localhost:3030/order/';
  constructor(
    private httpClient: HttpClient
  ) { }

  
  public lista(): Observable<Reserve[]> {
    return this.httpClient.get<Reserve[]>(`${this.productURL}`);
  }

  public save(report: Reserve): Observable<any> {
    return this.httpClient.post<any>(`${this.productURL}`, report);
  }

}

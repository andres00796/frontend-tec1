import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  productURL = 'http://localhost:3030/report/';
  constructor(
    private httpClient: HttpClient
  ) { }

  public lista(): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.productURL}`);
  }

  public save(report: Report): Observable<any> {
    return this.httpClient.post<any>(`${this.productURL}`, report);
  }

}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactURL = environment.contactURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.contactURL}`);
  }

  public listById(id:number): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.contactURL}${id}/${id}`);
  }

  public detail(id_contact: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${this.contactURL}${id_contact}`);
  }

  public save(id_user:number,contact: Contact): Observable<any> {
    return this.httpClient.post<any>(`${this.contactURL}${id_user}`, contact);
  }

  public update(id_contact: number, contact?: Contact): Observable<any> {
    return this.httpClient.put<any>(`${this.contactURL}${id_contact}`, contact);
  }

  public delete(id_contact?: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.contactURL}${id_contact}`);
  }
}

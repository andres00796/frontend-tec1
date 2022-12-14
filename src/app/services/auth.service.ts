import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewLogin } from '../models/new-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private http_client: HttpClient) { }

  login(dto: NewLogin):Observable<any>{
    return this.http_client.post<any>(this.authURL + 'login', dto);
  }

  register(dto: NewLogin):Observable<any>{
    return this.http_client.post<any>(this.authURL + 'new', dto);
  }
}

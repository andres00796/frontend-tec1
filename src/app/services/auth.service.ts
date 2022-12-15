import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private http_client: HttpClient) { }

  login(dto: Login):Observable<any>{
    return this.http_client.post<any>(this.authURL + 'login', dto);
  }

  register(dto: NewUser):Observable<any>{
    return this.http_client.post<any>(this.authURL + 'new', dto);
  }
}

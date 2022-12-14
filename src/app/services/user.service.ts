import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = environment.userURL;

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.userURL}`);
  }

  public listById(id_user:number): Observable<User> {
    return this.httpClient.get<User>(`${this.userURL}${id_user}`);
  }
  public detail(id_user: number): Observable<User> {
    return this.httpClient.get<User>(`${this.userURL}${id_user}`);
  }

  public save(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.userURL}`, user);
  }

  public update(id_user: number, user: User): Observable<any> {
    return this.httpClient.put<any>(`${this.userURL}${id_user}`, user);
  }

  public delete(id_user?: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.userURL}${id_user}`);
  }
}

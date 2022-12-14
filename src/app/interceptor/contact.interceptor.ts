import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class ContactInterceptor implements HttpInterceptor {

  constructor(private token_service: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let int_req = request;
    const token = this.token_service.getToken();
    console.log(token);
    if(token){
      int_req=request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(int_req);
  }
}

export const interceptor_provider = [{provide: HTTP_INTERCEPTORS, useClass: ContactInterceptor, multi: true}];
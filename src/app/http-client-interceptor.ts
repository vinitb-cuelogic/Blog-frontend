import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private $localStorage: LocalStorageService) {

  }

  // intercept(req: HttpRequest<any>,
  //           next: HttpHandler): Observable<HttpEvent<any>> {

  //   const token = this.$localStorage.retrieve("authenticationToken");
  //   console.log('jwt token ' + token);
  //   if (token) {
  //     const cloned = req.clone({
  //       headers: req.headers.set("Authorization",
  //         "Bearer " + token)
  //     });

  //     return next.handle(cloned);
  //   }
  //   else {
  //     return next.handle(req);
  //   }
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    let c = true;
    const re = '/api/auth/*';
    if (req.url.search(re) === -1) {
      const token = localStorage.getItem('authenticationToken');
      if (token != null) {
        authReq = req.clone({
          headers: req.headers.set("Authorization", 'Bearer ' + token),
        });
      }
    }
    return next.handle(authReq);
  }
}

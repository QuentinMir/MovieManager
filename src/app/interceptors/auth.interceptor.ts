import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    let clonedRequest;

    if (authToken) {
      clonedRequest = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + authToken)
      });
    } else {
      clonedRequest = request.clone();
    }

    /*déco si token expiré*/
    return next.handle(clonedRequest).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.authService.getCurrentUser()) {
        // auto logout if 401 or 403 response returned from api
        this.authService.doLogout();
      }

      const error = (err && err.error && err.error.message) || err.statusText;
      console.error(err);
      return throwError(error);
    }));
  }
}

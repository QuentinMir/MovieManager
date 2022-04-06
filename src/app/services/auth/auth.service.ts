import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../../model/interfaces/User";
import {BehaviorSubject, catchError, map, Observable, Subject, takeUntil, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'http://localhost:8000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  errorMessage: BehaviorSubject<string>;
  isConnected: BehaviorSubject<boolean>;
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, public router: Router) {
    this.errorMessage = new BehaviorSubject<string>('');
    this.isConnected = new BehaviorSubject<boolean>(false);
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/auth_token`, user)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.token);
          this.getUserProfile().pipe(takeUntil(this.destroy$)).subscribe((res) => {
            this.currentUser = res;
            this.isConnected.next(true);
            this.router.navigate(['movies']).then();
          });
        },
        error: (error: any) => {
          if (error == 'Invalid credentials.') {
            this.errorMessage.next('Les identifiants sont invalides');
          }
          console.log(error);
        }
      });
  }

  // User profile
  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}/current-user/`;
    return this.http.get(api, {headers: this.headers}).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.endpoint + '/current-user', {
      headers: this.headers
    });
  }


  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    this.isConnected.next(false);
    if (removeToken == null) {
      this.router.navigate(['log-in']).then();
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }
}

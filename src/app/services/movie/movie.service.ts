import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, Subscription, throwError} from "rxjs";
import {Movie} from "../../model/interfaces/Movie";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getAll(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.endpoint + '/movies.json', {
      headers: this.headers
    });
  }

  getOne(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(this.endpoint + '/movies/' + id + '.json', {
      headers: this.headers
    });
  }

  add(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(this.endpoint + '/movies.json', movie, {
      headers: this.headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  edit(id: number, movie: Movie): Observable<Movie> {
    return this.httpClient.put<Movie>(this.endpoint + '/movies/' + id + '.json', movie, {
      headers: this.headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<Movie>(this.endpoint + '/movies/' + id, {
      headers: this.headers
    }).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}

import {Component, OnInit} from '@angular/core';
import {Movie} from "../../model/interfaces/Movie";
import {MovieService} from "../../services/movie/movie.service";
import {BehaviorSubject, catchError, map, Observable, share, throwError} from "rxjs";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies!: Observable<Movie[]>;
  loadingErrors$: BehaviorSubject<boolean>;

  constructor(private movieService: MovieService) {
    this.loadingErrors$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
    /** méthode peut opti et qui cause des fuites de mémoire **/
    /*    this.movieService.getAll().subscribe((data) => {
          this.movies = data;
          this.loading = false;
        });*/
    /** méthode utilisant async qui unsubscribe automatiquement **/
    this.movies = this.movieService
      .getAll().pipe(
        catchError((error) => {
          console.log(error);
          this.loadingErrors$.next(true);
          return throwError(error);
        })
      )
    /*.pipe(
      share()
    )*/;
  }


}

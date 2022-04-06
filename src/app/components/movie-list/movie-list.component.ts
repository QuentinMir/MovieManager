import {Component, OnInit} from '@angular/core';
import {Movie} from "../../model/interfaces/Movie";
import {MovieService} from "../../services/movie/movie.service";
import {map, Observable, share} from "rxjs";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies!: Observable<Movie[]>;
  loading: boolean;

  constructor(private movieService: MovieService) {
    this.loading = true;
  }

  ngOnInit(): void {
    /** méthode peut opti et qui cause des fuites de mémoire **/
    /*    this.movieService.getAll().subscribe((data) => {
          this.movies = data;
          this.loading = false;
        });*/
    /** méthode utilisant async qui unsubscribe automatiquement **/
    this.movies = this.movieService
      .getAll()
    /*.pipe(
      share()
    )*/;
  }


}

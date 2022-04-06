import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from "../../model/interfaces/Movie";
import {MovieService} from "../../services/movie/movie.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})
export class MovieNewComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private movieService: MovieService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmitNewMovie(movie: Movie) {
    this.movieService.add(movie).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigateByUrl('/movies').then()
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }
}

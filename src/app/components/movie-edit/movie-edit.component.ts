import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from "../../model/interfaces/Movie";
import {MovieService} from "../../services/movie/movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription, takeUntil} from "rxjs";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit, OnDestroy {
  movie!: Movie;
  id!: number;
  private destroy$ = new Subject<void>();
  isLoaded: boolean = false;

  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.movieService.getOne(this.id).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.movie = res;
     this.isLoaded = true
    })

  }

  onSubmitEditMovie(movie: Movie) {
    this.movieService.edit(this.id, movie).subscribe(() => this.router.navigateByUrl('/movies').then());

  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }
}

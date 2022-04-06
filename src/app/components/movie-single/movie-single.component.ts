import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie/movie.service";
import {Movie} from "../../model/interfaces/Movie";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-movie-single',
  templateUrl: './movie-single.component.html',
  styleUrls: ['./movie-single.component.css']
})
export class MovieSingleComponent implements OnInit {
  movie$!: Observable<Movie>;
  id!: number;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    /*    this.movieService.getOne(this.id).subscribe((data) => {
          this.movie$ = data;
        })    */
    /** avec méthode async **/
    this.movie$ = this.movieService.getOne(this.id);
  }

  onDelete() {
    this.movieService.delete(this.id).subscribe(() => {
      this.router.navigateByUrl('/movies').then()
    });
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed

    /*this.subscription.unsubscribe()*/
  }
}

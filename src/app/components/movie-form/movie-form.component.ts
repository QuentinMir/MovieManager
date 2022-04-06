import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MovieService} from "../../services/movie/movie.service";
import {Movie} from "../../model/interfaces/Movie";

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  @Input() label!: string;
  @Input() movieToEdit!: Movie;
  @Output() submittedForm: EventEmitter<Movie>
  movieForm!: FormGroup;
  movie!: Movie;

  constructor(private fb: FormBuilder, private movieService: MovieService) {
    this.submittedForm = new EventEmitter<Movie>();
  }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm(): void {

    this.movieForm = this.fb.group({
      title: [null,
        Validators.required
      ],
      description: [null,
        [Validators.required,
          Validators.minLength(50)]
      ],
      director: [null,
        Validators.required
      ],
    });

    if (this.movieToEdit) {
      this.movieForm.patchValue({
        title: this.movieToEdit.title,
        description: this.movieToEdit.description,
        director: this.movieToEdit.director

      });
    }
  }

  onSubmittedForm() {
    if (this.movieForm.valid) {
      this.submittedForm.emit(this.movieForm.value);
    }
  }


}

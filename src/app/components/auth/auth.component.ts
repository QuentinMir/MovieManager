import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage$!: BehaviorSubject<string>;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.signinForm = this.fb.group({
      username: [
        null,
        [
          Validators.required,
        ],
      ],
      password: [
        null,
        [
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit() {
   this.errorMessage$ = this.authService.errorMessage;
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
}

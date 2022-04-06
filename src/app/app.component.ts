import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-manager';
  isConnected!: Observable<boolean>;

  constructor(public authService: AuthService) {
  }

  onLogout() {
    this.authService.doLogout()
  }

  ngOnInit(): void {
    this.isConnected = this.authService.isConnected;
  }
}

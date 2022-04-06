import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../model/interfaces/User";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!: Observable<User>;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
   this.user = this.authService.getCurrentUser();
  }

}


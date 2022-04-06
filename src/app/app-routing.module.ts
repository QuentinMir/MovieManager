import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {AuthComponent} from "./components/auth/auth.component";
import {ErrorComponent} from "./components/error/error.component";
import {MovieListComponent} from "./components/movie-list/movie-list.component";
import {MovieSingleComponent} from "./components/movie-single/movie-single.component";
import {MovieNewComponent} from "./components/movie-new/movie-new.component";
import {MovieEditComponent} from "./components/movie-edit/movie-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/log-in', pathMatch: 'full'},
  {path: 'log-in', component: AuthComponent},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'movies', component: MovieListComponent, canActivate: [AuthGuard]},
  {path: 'movies/new', component: MovieNewComponent, canActivate: [AuthGuard]},
  {path: 'movies/:id', component: MovieSingleComponent, canActivate: [AuthGuard]},
  {path: 'movies/edit/:id', component: MovieEditComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component: ErrorComponent},
  {path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

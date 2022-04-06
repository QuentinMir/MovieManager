import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {AuthComponent} from './components/auth/auth.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ErrorComponent } from './components/error/error.component';
import { ErrorsFormComponent } from './components/errors-form/errors-form.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieSingleComponent } from './components/movie-single/movie-single.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MovieNewComponent } from './components/movie-new/movie-new.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserProfileComponent,
    ErrorComponent,
    ErrorsFormComponent,
    MovieListComponent,
    MovieSingleComponent,
    MovieFormComponent,
    MovieNewComponent,
    MovieEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

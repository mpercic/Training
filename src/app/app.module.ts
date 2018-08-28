import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatSelectModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from './services/login.service';
import {HttpClientModule} from '@angular/common/http';
import {RegisterService} from './services/register.service';
import {AddExcercise, EditExcercise, ExcercisesComponent} from './excercises/excercises.component';
import {ExerciseService} from './services/exercise.service';
import {DataService} from './services/data.service';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent},
  {
    path: 'login',
    component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile/:user',
    component: ProfileComponent,
  },
  {
    path: 'excercises',
    component: ExcercisesComponent
  },
  {
    path: '**',
    component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ErrorComponent,
    HomeComponent,
    ExcercisesComponent,
    AddExcercise,
    EditExcercise,
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [LoginService, RegisterService,ExerciseService,DataService],
  bootstrap: [AppComponent],
  entryComponents: [AddExcercise,EditExcercise]
})
export class AppModule { }


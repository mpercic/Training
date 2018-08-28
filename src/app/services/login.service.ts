import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router:Router) { }

  login(login: any): Observable<any>{
    return this.http.post('/api/login', login);
  }
  logout(){
    localStorage.clear();
    location.reload();
    this.router.navigate(['']);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getUserExcercises(): Observable<any>{
    let id = localStorage.getItem('id');
    let headers = new HttpHeaders({
      _id: id
    });
    return this.http.get('/api/user/excercise',{headers});
  }

  getUserInfo(user:string): Observable<any>{
    let headers = new HttpHeaders({
      user: user
    });
    return this.http.get('/api/user',{headers});
  }

  removeUserExcercise(id, user): Observable<any>{
    console.log(id);
    console.log(user);
    let headers = new HttpHeaders({
      idEx: id,
      idUser: user
      });
    return this.http.delete('/api/user/excercise',{headers});
  }

  postUserExcercise(user, idExcer): Observable<any>{
    let obj = {
      idUser: user,
      idEx: idExcer
    };
    return this.http.post('/api/user/excercise', obj);
  }

}

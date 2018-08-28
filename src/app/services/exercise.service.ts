import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  excercises: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any>('/api/excercises').subscribe(res =>{
      this.excercises = res;
    })
  }

  getExcercises(): Observable<any>{
    return this.http.get('/api/excercises');
  }

  addExcercises(data: any): Observable<any>{
    return this.http.post('/api/excercises',data);
  }

  deleteExcercise(id): Observable<any>{
    let headers = new HttpHeaders({
      _id:  id,
    });
    return this.http.delete('/api/excercises',{headers});
  }

  editExcercise(excercise): Observable<any>{
    return this.http.put('/api/excercises',excercise);
  }
}

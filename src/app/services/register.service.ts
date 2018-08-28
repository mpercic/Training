import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  attemptRegistration(register: any): Observable<any>{
    return this.http.post<any>('/api/register',register);
  }}


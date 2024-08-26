import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials, User } from '../type/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private BASEURL = "http://localhost:5000/"

  registerUser(data: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.BASEURL + "register", data, { withCredentials: true })
  }



  loginUser(data: LoginCredentials): Observable<{ result: User, message: string }> {
    return this.http.post<{ message: string, result: User }>(this.BASEURL + "login", data, { withCredentials: true })
  }



}

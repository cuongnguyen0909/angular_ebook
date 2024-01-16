import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REST_API_SERVER = 'http://localhost:3000/api/v1/user/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'current', this.httpOptions)
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.REST_API_SERVER, this.httpOptions)
  }

  updateByAdmin(id: any, data: any): Observable<any> {
    return this.http.put(this.REST_API_SERVER + id, data, this.httpOptions)
  }

  updateCurrentUser(data: any): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'current', data)
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.REST_API_SERVER}/${id}`, this.httpOptions)
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'changepassword', data, this.httpOptions)
  }
}

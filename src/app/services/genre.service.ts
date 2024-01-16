import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {


  private REST_API_SERVER = "http://localhost:3000/api/v1/genre/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAllGenres(): Observable<any> {
    return this.http.get(this.REST_API_SERVER, this.httpOptions);
  }

  getGenreById(id: any): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}/${id}`);
  }

  createGenre(data: any): Observable<any> {
    return this.http.post(this.REST_API_SERVER, data);
  }

  updateGenre(id: any, data: any): Observable<any> {
    return this.http.put(`${this.REST_API_SERVER}/${id}`, data);
  }

  deleteGenre(id: any): Observable<any> {
    return this.http.delete(`${this.REST_API_SERVER}/${id}`);
  }
}

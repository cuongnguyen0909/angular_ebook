import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private REST_API_SERVER = "http://localhost:3000/api/v1/book/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private http: HttpClient
  ) { }

  // getAllBooks(query: any): Observable<any> {
  //   return this.http.get(this.REST_API_SERVER + '?' + query, this.httpOptions);
  // }
  createBook(data: any): Observable<any> {
    return this.http.post(`${this.REST_API_SERVER}`, data);
  }

  getBookByGenre(genre: any): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}?genre=${genre}`, this.httpOptions);
  }

  getBookById(bid: any): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}/${bid}`, this.httpOptions);
  }

  getBookBySearch(query: any): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}?query=${query}`, this.httpOptions);
  }

  getAllBooks(): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}`, this.httpOptions)
  }

  ratingBook(data: any): Observable<any> {
    return this.http.put(`${this.REST_API_SERVER}/ratings`, data, this.httpOptions);
  }

  updateBook(id: any, data: any): Observable<any> {
    return this.http.put(`${this.REST_API_SERVER}/${id}`, data);
  }

  deleteBook(id: any): Observable<any> {
    return this.http.delete(`${this.REST_API_SERVER}/${id}`, this.httpOptions);
  }

  getTopBook(limit: any, sort: any): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}?limit=${limit}&sort=${sort}`, this.httpOptions);
  }

  sortBook(sort: any): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}?sort=${sort}`, this.httpOptions);
  }
  getBookSearch(query: any, sort: any): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}?query=${query}&sort=${sort}`, this.httpOptions);
  }
}

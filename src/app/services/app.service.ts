import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public readingBook = new BehaviorSubject<boolean>(false);
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public bookData = new BehaviorSubject<any>(null);
  public showLogginForm = new BehaviorSubject<boolean>(false);
  public showRegiserForm = new BehaviorSubject<boolean>(false);
  public userData = new BehaviorSubject<any>(null);

  constructor(
    private router: Router
  ) { }

  public sendStatusShowLoginForm(isShowLoginForm: boolean) {
    this.showLogginForm.next(isShowLoginForm);
  }

  public sendStatusShowRegisterForm(isShowRegisterForm: boolean) {
    this.showRegiserForm.next(isShowRegisterForm);
  }

  public sendUserData(data: any) {
    this.userData.next(data);
  }

  public sendBookData(bookData: any) {
    this.bookData.next(bookData);
  }

  public sendStatusLogin(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }

  public sendStatusReadingBook(isReadingBook: boolean) {
    this.readingBook.next(isReadingBook);
  }

}

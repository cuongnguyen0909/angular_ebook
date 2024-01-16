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
  public showHeader = new BehaviorSubject<boolean>(true);
  public showBookDetail = new BehaviorSubject<any>(null);
  public idBook = new BehaviorSubject<any>(null);
  public bookList = new BehaviorSubject<any>(null);
  public listGenres = new BehaviorSubject<any>(null);
  public genreData = new BehaviorSubject<any>(null);
  public userDataInAdmin = new BehaviorSubject<any>(null);
  public isLoggedOutFromAdmin = new BehaviorSubject<boolean>(false);
  public erroAddStatus = new BehaviorSubject<any>(null);
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

  public sendStatusShowHeader(isShowHeader: boolean) {
    this.showHeader.next(isShowHeader);
  }

  public sendStatusShowBookDetail(bookDetail: any) {
    this.showBookDetail.next(bookDetail);
  }

  public sendIdBook(idBook: any) {
    this.idBook.next(idBook);
  }

  public sendBookList(bookList: any) {
    this.bookList.next(bookList);
  }

  public sendListGenres(listGenres: any) {
    this.listGenres.next(listGenres);
  }

  public sendGenreData(genreData: any) {
    this.genreData.next(genreData);
  }

  public sendUserDataInAdmin(userDataInAdmin: any) {
    this.userDataInAdmin.next(userDataInAdmin);
  }

  public sendStatusLogoutFromAdmin(isLoggedOutFromAdmin: boolean) {
    this.isLoggedOutFromAdmin.next(isLoggedOutFromAdmin);
  }

  public sendErrorAddStatus(errorAddStatus: any) {
    this.erroAddStatus.next(errorAddStatus);
  }
}

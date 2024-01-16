import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userData!: any;
  constructor(
    private appService: AppService,
    private router: Router,
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(async (res: any) => {
      await this.appService.sendBookList(res.books);
    })
    this.userData = JSON.parse(localStorage.getItem('user') || '{}')
    window.addEventListener('popstate', () => {
      this.appService.sendStatusShowHeader(true);
    });

    if (location.pathname === '/manage/admin' || location.pathname === '/manage/admin/books' || location.pathname === '/manage/admin/users' || location.pathname === '/manage/admin/genres' || location.pathname === '/manage/admin/dashboard') {
      this.appService.sendStatusShowHeader(false);
    } else {
      this.appService.sendStatusShowHeader(true);
    }
  }

  toggleLogin() {
    const login = document.querySelector('.account .info') as HTMLElement;
    login.classList.toggle('active');
    console.log(login);

    if (window.location.pathname === '/manage/admin') {
      const books = document.querySelector('.books') as HTMLElement;
      books.classList.add('active');
    }
  }

  clickBackHome() {
    this.appService.sendStatusShowHeader(true);
    this.router.navigate(['/']);
  }

  manageBook() {
    this.router.navigate(['/manage/admin/books']);
  }

  logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
    await this.appService.sendStatusLogoutFromAdmin(true);
  }
  manageBooks() {
    this.router.navigate(['/manage/admin/books']);
  }
}

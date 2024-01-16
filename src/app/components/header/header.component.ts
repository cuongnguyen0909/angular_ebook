import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { clsx } from 'clsx';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  url: string = 'http://localhost:3000/images/';
  formChangePassword = new FormGroup({
    password: new FormControl(''),
    newPassword: new FormControl(''),
    reNewPassword: new FormControl('')
  });
  isShowHeader: boolean = true;
  isReadingBook: boolean = false;
  userData!: any;
  isLoggedIn: boolean = false;
  searchTextInput!: string;
  role!: string;
  listBook!: any;
  isAdmin: boolean = false;
  constructor(
    private router: Router,
    private appService: AppService,
    private userService: UserService,
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.appService.sendBookList(this.listBook);
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
    if (localStorage.getItem('user')) {
      this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    }

    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    }

    this.appService.isLoggedOutFromAdmin.subscribe(async (res: any) => {
      if (res) {
        await this.appService.sendStatusLogoutFromAdmin(false)
        location.reload();
      }
    })
    // this.appService.userData.subscribe((res: any): any => {
    //   console.log(res)
    //   this.userData = res.userData;
    // })
    this.appService.readingBook.subscribe((res: any): any => {
      this.isReadingBook = res;
    })
    this.appService.isLoggedIn.subscribe((res: any): any => {
      this.isLoggedIn = res;
    })

    this.appService.showHeader.subscribe((res: any): any => {
      this.isShowHeader = res;
    })
    this.role = localStorage.getItem('role') || '';
    console.log(this.role)
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    window.location.reload();
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  handleButtonClick(event: Event) {
    event.stopPropagation();
  }

  redirectToBooksByGenres() {
    this.router.navigate(['/books-by-genres']);
  }

  toggleLogin = () => {
    // const space = document.querySelector('.space') as HTMLElement;
    // space.classList.add('active');
    this.appService.sendStatusShowLoginForm(true);
    console.log(this.appService.sendStatusShowLoginForm(true))
  }

  dropDown() {
    const user = document.querySelector('.user-info') as HTMLElement;
    user.classList.toggle('active');
    const i = document.getElementById('userI') as HTMLElement;
    if (user.classList.contains('active')) {
      i.className = 'fa-solid fa-sort-up';
    }
    else {
      i.className = 'fa-solid fa-sort-down';
    }
  }

  shouldShowHeader(): boolean {
    return this.isShowHeader;
  }

  isManageAdminPage(): boolean {
    return this.router.url.includes('/manage/admin');
  }

  removeDropDownList() {
    const user = document.querySelector('.user-info') as HTMLElement;
    user.classList.remove('active');
    const i = document.getElementById('userI') as HTMLElement;
    i.className = 'fa-solid fa-sort-down';
  }

  clickToAdmin = async () => {
    await this.appService.sendStatusShowHeader(false);
  }

  toggleProfile() {
    const profile = document.getElementById('profileComponent') as HTMLElement;
    profile.classList.toggle('active');
  }

  toggleChangePassword() {
    const change = document.getElementById('changePasswordComponent') as HTMLElement;
    change.classList.toggle('active');
  }

  removeChangePassword() {
    const change = document.getElementById('changePasswordComponent') as HTMLElement;
    change.classList.remove('active');
    location.reload();
  }

  onChangePassword() {
    this.userService.changePassword(this.formChangePassword.value).subscribe((res: any): any => {
      // console.log(this.formChangePassword.value)
      if (res.status) {
        return Swal.fire({
          icon: 'success',
          title: 'Change password successfully',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.reload();
          this.router.navigate(['/']);
        })
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Change password failed',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        })
      }
    })
  }

  searchOnEnter(event: any): void {
    if (event.key === 'Enter') {
      this.searchBook();
    }
    if (window.location.pathname === '/book-search') {
      this.router.navigate(['/book-search'], { queryParams: { query: this.searchTextInput } });
      setTimeout(() => {
        window.location.reload();
      }, 20)
    }
    if (this.searchTextInput === '') {
      window.location.reload();
    }

  }
  searchBook(): void {
    // console.log(this.searchTextInput);
    if (window.location.pathname !== '/book-search') {
      this.router.navigate(['/book-search'], { queryParams: { query: this.searchTextInput } });
    }
  }
  clickSearch() {
    this.searchBook()
    if (window.location.pathname === '/book-search') {
      this.router.navigate(['/book-search'], { queryParams: { query: this.searchTextInput } });
      setTimeout(() => {
        window.location.reload();
      }, 20)
    }
    if (this.searchTextInput === '') {
      window.location.reload();
    }
  }
  clickIn(event: any) {
    event.stopPropagation();
  }

  setIUrlImg(image: string) {
    return this.url + image;
  }
}

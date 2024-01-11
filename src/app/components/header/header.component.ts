import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isReadingBook: boolean = false;
  userData!: any;
  isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private appService: AppService,
    private userService: UserService
  ) {
    // const token = localStorage.getItem('token');
    // const name = localStorage.getItem('name');
    // if (token && name) {
    //   this.isLoggin = true;
    //   this.userData = name
    // }
  }

  ngOnInit(): void {
    // this.appService.userData.subscribe((userData: any) => {
    //   this.userData = userData;
    // });
    if (localStorage.getItem('token')) {
      this.userService.getCurrentUser().subscribe((res: any): any => {
        if (res.status) {
          this.isLoggedIn = true;
          this.userData = res.user.name;
        }
      })
    }

    this.appService.readingBook.subscribe((res: any): any => {
      this.isReadingBook = res;
    })
    this.appService.isLoggedIn.subscribe((res: any): any => {
      this.isLoggedIn = res;
    })
  }


  logout() {
    localStorage.removeItem('token');
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

  toggleLogin() {
    // const space = document.querySelector('.space') as HTMLElement;
    // space.classList.add('active');
    this.appService.sendStatusShowLoginForm(true);
    console.log(this.appService.sendStatusShowLoginForm(true))
  }
}

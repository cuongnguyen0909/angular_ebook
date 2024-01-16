import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLoginForm: boolean = false;
  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  message: string = '';
  logginFailed: boolean = false;
  userData!: any;
  handleButtonClick(event: Event) {
    event.stopPropagation();
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private appService: AppService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.appService.showLogginForm.subscribe((res: any): any => {
      this.showLoginForm = res;
    })
    this.appService.userData.subscribe((res: any): any => {
      console.log(res)
      if (res) {
        return Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      }

    })
  }

  onLogin(): any {
    this.authService.login(this.formLogin.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user', JSON.stringify(res.userData));
        localStorage.setItem('role', res.role);
        this.appService.sendStatusShowLoginForm(false);
        this.appService.sendStatusLogin(true);
        this.appService.sendUserData(res);
      },
      error: (error) => {
        console.error('Error logging in:', error);
        this.message = 'Login failed. Please try again.'
        this.logginFailed = true;
      }
    });
  }

  register(): any {
    this.appService.sendStatusShowRegisterForm(true);
    this.showLoginForm = false;
  }

  backToHome(): any {
    this.showLoginForm = false;
    this.appService.sendStatusShowRegisterForm(false);
    // window.location.reload();
  }
}

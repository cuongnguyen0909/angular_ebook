import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isShowLoginForm: boolean = false;
  isShowRegisterForm: boolean = false;
  formRegister!: FormGroup;
  formVerifyEmail!: FormGroup;
  isVeirfyEmail: boolean = false;
  messageVerifyEmail: String = '';
  toke: String = '';
  constructor(
    private appService: AppService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    })

    this.formVerifyEmail = this.fb.group({
      token: ['', Validators.required]
    })

    this.appService.showRegiserForm.subscribe((res: any): any => {
      this.isShowRegisterForm = res;
    })

  }

  backToLogin = async () => {
    await this.appService.sendStatusShowLoginForm(true);
    await this.appService.sendStatusShowRegisterForm(false);
  }

  backToHome = async () => {
    this.isShowLoginForm = false;
    await this.appService.sendStatusShowRegisterForm(false);
    this.appService.showRegiserForm.subscribe((res: any): any => {
      this.isShowRegisterForm = res;
    })
    // window.location.reload();
  }

  register(): any {
    // console.log(this.formRegister.value)
    // console.log(this.formRegister.invalid)
    // console.log(this.formRegister.valid)
    // this.spinner.show();
    this.authService.register(this.formRegister.value).subscribe(async (res: any) => {
      if (res.status) {
        // await this.spinner.hide();
        this.isVeirfyEmail = true;
        this.isShowRegisterForm = false;
        await this.appService.sendStatusShowRegisterForm(false);
      }
    })
  }

  verifyEmail(): any {
    console.log(this.formVerifyEmail.value)
    this.authService.finalRegister(this.formVerifyEmail.value.token).subscribe((res: any): any => {
      if (res.status) {

        return Swal.fire({
          icon: 'success',
          title: 'Register success',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then(result => {
          if (result.isConfirmed) {
            this.isVeirfyEmail = false;
            this.isShowRegisterForm = false
            this.appService.sendStatusShowLoginForm(true);
          }
        })
      } else {
        // this.messageVerifyEmail = 'Token is invalid';
        return Swal.fire({
          icon: 'error',
          title: 'Token is invalid',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        })
      }
    })

  }

}

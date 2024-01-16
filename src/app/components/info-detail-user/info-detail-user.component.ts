import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-detail-user',
  templateUrl: './info-detail-user.component.html',
  styleUrls: ['./info-detail-user.component.css']
})
export class InfoDetailUserComponent implements OnInit {
  formUpdateProfile = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
  })
  url = 'http://localhost:3000/images/';
  file: any;
  preview: any;
  userData: any;
  isPreview: boolean = false;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '{}')
    console.log(this.userData)
    this.formUpdateProfile.setValue({
      name: this.userData?.name,
      phone: this.userData?.phone
    })
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e: any) => {
      this.preview = e.target.result;
      this.isPreview = true;
      console.log(this.preview)
    }
    this.userData.avatar = this.file;
    // console.log(this.preview)
  }

  setUrlImg(image: string) {
    return this.url + image;
  }

  removeProfile() {
    const profile = document.getElementById('profileComponent') as HTMLElement;
    profile.classList.remove('active');
    location.reload();
  }

  onUpdateProfile() {
    const formData = new FormData();
    const name: any = this.formUpdateProfile.get('name')?.value;
    const phone: any = this.formUpdateProfile.get('phone')?.value;
    formData.append('name', name);
    formData.append('phone', phone);
    if (this.file) {
      formData.append('avatar', this.file, this.file.name);
    }

    this.userService.updateCurrentUser(formData).subscribe((res: any): any => {
      // console.log(res)
      if (res.status) {
        return Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
            localStorage.setItem('user', JSON.stringify(res.user));
          }
        })
      }
    })

  }
  clickIn(event: any) {
    event.stopPropagation();
  }
}

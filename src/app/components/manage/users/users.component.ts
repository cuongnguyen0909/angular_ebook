import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  searchText: string = ''
  url = 'http://localhost:3000/images/';
  page: number = 1;
  userList!: any;
  roles: any = ['admin', 'user']
  status: any = ['active', 'blocked']
  formUpdateUser = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(''),
    status: new FormControl('')
  })
  userData!: any;
  constructor(
    private userService: UserService,
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res: any): any => {
      console.log(res)
      this.userList = res.users;

    })

    this.appService.userDataInAdmin.subscribe((res: any): any => {
      this.userData = res;
    })
  }
  clickIn(event: any) {
    event.stopPropagation();
  }

  toggleAddUser() {
    const addUser = document.getElementById('addUserComponent') as HTMLElement;
    addUser.classList.toggle('active');
  }

  toggleUpdateUser(user: any) {
    const updateUser = document.getElementById('updateUserComponent') as HTMLElement;
    updateUser.classList.toggle('active');
    this.appService.sendUserDataInAdmin(user);
    console.log(user)
    this.formUpdateUser.setValue({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      role: user?.role,
      status: user?.status
    })
  }

  // removeAddUser() {
  //   const addUser = document.getElementById('addUserComponent') as HTMLElement;
  //   addUser.classList.remove('active');
  // }

  removeUpdateUser() {
    const updateUser = document.getElementById('updateUserComponent') as HTMLElement;
    updateUser.classList.remove('active');
  }

  onUpdateUser() {
    console.log(this.formUpdateUser.value)
    this.userService.updateByAdmin(this.userData?._id, this.formUpdateUser.value).subscribe((res: any): any => {
      if (res.status) {
        return Swal.fire({
          icon: 'success',
          title: 'Update user successfully',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.reload();
          this.router.navigate(['/manage/users']);
        })
      }
    })
  }


  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((res: any): any => {
      if (res.status) {
        return Swal.fire({
          icon: 'success',
          title: 'Delete user successfully',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.reload();
          this.router.navigate(['/manage/users']);
        })
      }
    })
  }
  setUrlImage(image: any) {
    return this.url + image;
  }
}

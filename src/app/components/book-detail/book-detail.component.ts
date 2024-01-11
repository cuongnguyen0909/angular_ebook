import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent {
  serverUrl = 'http://localhost:3000/images/';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue!: number;
  updatedAt!: any;
  value: number = 0; //addition of .5
  id!: any;
  token!: any;
  book!: any;
  showComment: boolean = false;
  starList: string[] = [];
  previousValueStar: number = 0;
  currentRating!: number;
  formComment!: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private appService: AppService,
    private fb: FormBuilder
  ) { }

  readingBook() {
    this.appService.sendStatusReadingBook(true);
    this.router.navigate(['/reading-book']);
  }

  ngOnInit() {
    // this.setStyleStar();
    this.id = this.route.snapshot.paramMap.get('bid');
    this.bookService.getBookById(this.id).subscribe((res) => {
      // Xử lý dữ liệu sách nhận được từ API ở đây
      this.book = res.book;
      this.appService.sendBookData(this.book);
      this.value = this.book.totalRating || 0;
      this.starList = this.renderStar(this.value);
      // this.updatedAt = moment(this.book.ratings.updatedAt).fromNow();
      console.log(this.value)
      console.log(this.book)
    })
    this.token = localStorage.getItem('token');
    // console.log(this.book)
    // console.log(this.value)
    this.formComment = this.fb.group({
      comment: ['', [Validators.required]]
    })
  }


  formatDate(date: any) {
    return moment(date).fromNow();
  }

  renderStar(number: any) {
    const starList = [];
    number = Math.round(number);
    if (+number === 0) {
      for (let i = 0; i < 5; i++) {
        starList.push('fa-regular fa-star');
      }
    } else if (+number !== 0) {
      for (let i = 0; i < +number; i++) {
        starList.push('fa-solid fa-star');
      }
      for (let i = 5; i > +number; i--) {
        starList.push('fa-regular fa-star');
      }
    }
    return starList;
  }


  // thực hiện chức năng comment
  sendComment() {
    console.log(this.currentRating);

  }

  reviewNow(): any {
    if (!this.token) {
      return Swal.fire({
        title: 'Please login to review',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.appService.sendStatusShowLoginForm(true);
        }
      })
    }
    this.showComment = true;
  }

  countStar(star: any) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

  onSubmitComment() {
    // console.log({ ...this.formComment.value, star: this.selectedValue || 1, bid: this.id })
    this.bookService.ratingBook({ ...this.formComment.value, star: this.selectedValue || 1, bid: this.id })
      .subscribe((res: any) => {
        if (res.status) {
          window.location.reload();
        }
      })
  }

  setUrlImage(image: string) {
    return this.serverUrl + image;
  }


}

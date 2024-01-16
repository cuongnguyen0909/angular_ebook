import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AppService } from 'src/app/services/app.service';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  url = 'http://localhost:3000/images/';
  searchText: string = '';
  listBook!: any;
  page: number = 1;
  constructor(
    private appService: AppService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((res: any): any => {
      this.listBook = res?.books;
      if (res.status) {
        this.appService.sendBookList(res?.books);
      }
    });
  }

  toggleAddBook() {
    const addBook = document.getElementById('addBookComponent') as HTMLElement;
    // console.log(document.getElementById('addBookComponent'))
    addBook.classList.toggle('active');
  }

  toggleUpdateBook = async (id: any, bookData: any) => {
    const updateBook = document.getElementById('updateBookComponent') as HTMLElement;
    updateBook.classList.toggle('active');
    await this.appService.sendStatusShowBookDetail(bookData)
    await this.appService.sendIdBook(id);
  }

  deletBook(id: any) {
    this.bookService.deleteBook(id).subscribe(async (res: any) => {
      if (res?.status) {
        this.bookService.getAllBooks().subscribe((res: any) => {
          this.listBook = res?.books;
          if (res.status) {
            this.appService.sendBookList(res?.books);
          }
        });
        return Swal.fire({
          icon: 'success',
          title: 'Xóa thành công',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
            this.router.navigate(['/manage/books']);
          }
        })

      }
    });
  }

  setUrlImage(image: any) {
    return `${this.url}${image}`;
  }

  formatDate(date: any) {
    return moment(date).format('DD-MM-YYYY');
  }

}

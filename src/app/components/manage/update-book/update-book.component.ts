import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  formUpdateBook = new FormGroup({
    title: new FormControl(''),
    genre: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    publication_date: new FormControl(''),
    totalPage: new FormControl(''),
  });
  bookId!: any;
  thumb: any;
  fileReader: any;
  preview: any;
  idBook!: any;
  bookData!: any;
  bookDetail!: any;
  listGenres!: any;
  url = 'http://localhost:3000/images/';
  constructor(
    private appService: AppService,
    private genreService: GenreService,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(this.bookData)
    this.appService.idBook.subscribe(async (res: any) => {
      this.bookId = res;
      await this.appService.sendIdBook(this.bookId);
      // console.log(this.bookId)
    })
    this.appService.showBookDetail.subscribe(async (res: any) => {
      console.log(res)
      this.bookData = res?._id;
      await this.formUpdateBook.setValue({
        title: res?.title,
        genre: res?.genre,
        author: res?.author,
        description: res?.description,
        publication_date: res?.publication_date,
        totalPage: res?.totalPage
      })
    })
    // console.log(this.formUpdateBook.value)
    // console.log(this.bookId)
    this.genreService.getAllGenres().subscribe((res: any): any => {
      this.listGenres = res?.data;
    })
  }

  clickIn(event: any) {
    event.stopPropagation();
  }

  removeUpdateBook() {
    const updateBook = document.getElementById('updateBookComponent') as HTMLElement;
    updateBook.classList.remove('active');
  }
  onUpdate() {
    // console.log(this.formUpdateBook.value)
    // console.log(this.bookId)
    const formData = new FormData();
    const title: any = this.formUpdateBook.value?.title;
    const genre: any = this.formUpdateBook.value?.genre;
    const author: any = this.formUpdateBook.value?.author;
    const description: any = this.formUpdateBook.value?.description;
    const publication_date: any = this.formUpdateBook.value?.publication_date;
    const totalPage: any = this.formUpdateBook.value?.totalPage;
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('publication_date', publication_date);
    formData.append('totalPage', totalPage);
    if (this.thumb) {
      formData.append('thumb', this.thumb, this.thumb?.name);
    }
    if (this.fileReader) {
      formData.append('fileReader', this.fileReader, this.fileReader?.name);
    }
    this.bookService.updateBook(this.bookId, formData).subscribe((res: any): any => {
      if (res.status) {
        return Swal.fire({
          icon: 'success',
          title: 'Update book successfully',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result: any) => {
          if (result.isConfirmed) {
            location.reload();
            this.router.navigate(['/manage/admin/books']);
          }
        })
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Update book failed',
          showConfirmButton: false,
          confirmButtonText: 'OK',
        })
      }
    })
  }

  setUrlImage(image: any) {
    return `${this.url}${image}`;
  }

  selectFileImage(event: any) {
    this.thumb = event.target.files[0];
  }
  setFileReader(event: any) {
    this.fileReader = event.target.files[0];
  }
}

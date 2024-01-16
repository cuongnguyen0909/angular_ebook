import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  listGenres!: any;
  thumb: any;
  fileReader: any;
  errorAddStatus: boolean = false;
  message: string = '';
  addBookForm = new FormGroup({
    title: new FormControl(''),
    genre: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    publication_date: new FormControl(''),
    totalPage: new FormControl(''),
  });

  constructor(
    private genreService: GenreService,
    private bookService: BookService,  // Assuming you have a BookService for making API requests
    private router: Router,
    private appService: AppService
  ) {

  }

  ngOnInit(): void {
    this.genreService.getAllGenres().subscribe((res: any): any => {
      this.listGenres = res?.data;
    });
    this.appService.erroAddStatus.subscribe((res: any): any => {
      console.log(res)
    })
  }

  removeAddBook() {
    const addBook = document.getElementById('addBookComponent') as HTMLElement;
    addBook.classList.remove('active');
  }
  setThumb(event: any) {
    this.thumb = event.target?.files[0];
  }
  setFileReader(event: any) {
    this.fileReader = event.target?.files[0];
  }
  logFormData(formData: any) {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  }

  clickIn(event: any) {
    event.stopPropagation();
  }
  onCreatebook() {
    const formData = new FormData();
    const title: any = this.addBookForm.value?.title;
    const genre: any = this.addBookForm.value?.genre;
    const author: any = this.addBookForm.value?.author;
    const description: any = this.addBookForm.value?.description;
    const publication_date: any = this.addBookForm.value?.publication_date;
    const totalPage: any = this.addBookForm.value?.totalPage;
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('publication_date', publication_date);
    formData.append('totalPage', totalPage);
    formData.append('thumb', this.thumb, this.thumb?.name);
    formData.append('fileReader', this.fileReader, this.fileReader?.name);
    // this.logFormData(formData);
    this.bookService.createBook(formData).subscribe((response: any): any => {
      if (response.status) {
        Swal.fire({
          icon: 'success',
          title: 'Create book successfully',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
            this.router.navigate(['/manage/books']);
          }
        })
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Create book failed',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        })
      }
    }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  listGenres!: any;
  addBookForm: FormGroup;
  constructor(
    private genreService: GenreService,
    private formBuilder: FormBuilder,
    private bookService: BookService,  // Assuming you have a BookService for making API requests
    private router: Router
  ) {
    this.addBookForm = this.formBuilder.group({
      title: [''],
      genre: [''],
      author: [''],
      description: [''],
      publication_date: [''],
      totalPage: [''],
      thumb: [''],
      fileReader: ['']
    });
  }

  ngOnInit(): void {
    this.genreService.getAllGenres().subscribe((res: any): any => {
      this.listGenres = res.data;
    });
  }

  removeAddBook() {
    const addBook = document.getElementById('addBookComponent') as HTMLElement;
    addBook.classList.remove('active');
  }

  onCreatebook() {
    const formData = new FormData();
    formData.append('title', this.addBookForm.get('title')?.value);
    formData.append('genre', this.addBookForm.get('genre')?.value);
    formData.append('author', this.addBookForm.get('author')?.value);
    formData.append('description', this.addBookForm.get('description')?.value);
    formData.append('publication_date', this.addBookForm.get('publication_date')?.value);
    formData.append('totalPage', this.addBookForm.get('totalPage')?.value);
    formData.append('thumb', this.addBookForm.get('thumb')?.value);
    formData.append('fileReader', this.addBookForm.get('fileReader')?.value);

    this.bookService.createBook(formData).subscribe((response: any) => {
      if (response.success) {
        console.log('Book created successfully');
        // Optionally, you can navigate to the book detail page or any other route
        // this.router.navigate(['/books', response.data._id]);
      } else {
        console.error('Failed to create book');
      }
    });
  }
}

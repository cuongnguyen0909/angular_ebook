import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-book-search-list',
  templateUrl: './book-search-list.component.html',
  styleUrls: ['./book-search-list.component.css']
})
export class BookSearchListComponent implements OnInit {
  serverUrl = 'http://localhost:3000/images/';
  searchQuery!: string;
  bookSearchList!: any;
  genreList!: any;
  selected: any;
  selectForm = new FormGroup({
    genre: new FormGroup(''),
  })
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private genreService: GenreService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
    })
    if (this.searchQuery) {

      this.bookService.getBookBySearch(this.searchQuery).subscribe((res) => {
        this.bookSearchList = res.books;
      })
    } else {
      this.bookService.getAllBooks().subscribe((res) => {
        this.bookSearchList = res.books;
      })
    }

    this.genreService.getAllGenres().subscribe((res) => {
      console.log(res)
      this.genreList = res.data;
    })
    this.selectForm.setValue({
      genre: this.searchQuery
    })
  }
  setUrlImage(image: string) {
    return this.serverUrl + image;
  }

  redirectToBookDetail(id: string) {
    this.router.navigate(['/book-detail', id]);
  }

  sortByRating() {
    this.bookService.sortBook('rating').subscribe((res) => {
      this.bookSearchList = res.books;
      if (window.location.pathname === '/book-search') {
        this.router.navigate(['/book-search'], { queryParams: { rating: '-rating' } });
        setTimeout(() => {
          window.location.reload();
        }, 20)
      }
    })
  }

  sortByView() {
    this.bookService.sortBook('totalView').subscribe((res) => {
      this.bookSearchList = res.books;
      if (window.location.pathname === '/book-search') {
        this.router.navigate(['/book-search'], { queryParams: { sort: '-totalView' } });
        setTimeout(() => {
          window.location.reload();
        }, 20)
      }
    })
  }

  sortByTitle() {
    this.bookService.sortBook('title').subscribe((res) => {
      this.bookSearchList = res.books;
      if (window.location.pathname === '/book-search') {
        this.router.navigate(['/book-search'], { queryParams: { sort: 'title' } });
        setTimeout(() => {
          window.location.reload();
        }, 20)
      }
    })

  }
  sortByPublistYear() {
    this.bookService.sortBook('publication_date').subscribe((res) => {
      this.bookSearchList = res.books;
      if (window.location.pathname === '/book-search') {
        this.router.navigate(['/book-search'], { queryParams: { sort: 'publication_date' } });
        setTimeout(() => {
          window.location.reload();
        }, 20)
      }
    })
  }
  selectOption(event: any) {
    console.log(event.target.value)
    if (window.location.pathname === '/book-search') {
      this.router.navigate(['/book-search'], { queryParams: { query: event.target.value } });
      setTimeout(() => {
        window.location.reload();
      }, 20)
    }
  }

}

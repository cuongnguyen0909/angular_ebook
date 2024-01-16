import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books-by-genres',
  templateUrl: './book-by-genres.component.html',
  styleUrls: ['./book-by-genres.component.css']
})
export class BooksByGenresComponent implements OnInit {
  serverUrl = 'http://localhost:3000/images/';
  id!: any;
  genre!: string;
  listBooks!: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.genre = params['genre'];
    })
    this.bookService.getBookByGenre(this.genre).subscribe((books) => {
      // Xử lý dữ liệu sách nhận được từ API ở đây
      this.listBooks = books.books
    });
  }
  redirectToBookDetail(id: string) {
    window.scroll(0, 0);
    this.router.navigate(['/book-detail', id]);
  }

  setUrlImage(image: string) {
    return this.serverUrl + image;
  }

}

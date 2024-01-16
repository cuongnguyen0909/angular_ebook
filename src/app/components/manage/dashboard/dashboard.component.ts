import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  url = 'http://localhost:3000/images/';
  bookList!: any;
  genreList!: any;
  userList!: any;
  topList!: any;
  constructor(
    private appService: AppService,
    private userService: UserService,
    private bookService: BookService,
    private genreService: GenreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res: any) => {
      console.log(res)
      this.userList = res;
    })
    this.bookService.getAllBooks().subscribe((res: any) => {
      console.log(res)
      this.bookList = res;
    })
    this.genreService.getAllGenres().subscribe((res: any) => {
      console.log(res)
      this.genreList = res;
    })

    this.bookService.getTopBook(5, '-totalView').subscribe((res: any) => {
      console.log(res)
      this.topList = res;
    })

  }

  setUrlImg(image: string) {
    return this.url + image;
  }

  bookDetail(id: string) {
    this.router.navigate(['/book-detail', id]);
    this.appService.sendStatusShowHeader(true)
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  serverUrl = 'http://localhost:3000/images/';
  listGenres!: any;

  constructor(
    private router: Router,
    private genreService: GenreService,
    private appService: AppService
  ) {
    this.genreService.getAllGenres().subscribe((res) => {
      if (res.status) {
        this.listGenres = res.data;
        // console.log(this.listGenres)
      }
    }
    );
  }

  ngOnInit(): void {
    if (location.pathname === '/' || location.pathname === '/home') {
      this.appService.sendStatusShowHeader(true);
    }
  }

  getBookByGenre(genre: string) {
    this.router.navigate(
      ['/book-search'],
      { queryParams: { query: genre } }
    )
  }

  setUrlImage(image: string) {
    return this.serverUrl + image;
  }

  viewAllBooks(string: string) {
    this.router.navigate(
      ['/book-search'],
      { queryParams: { query: string } }
    )
    this.router.navigate(['/book-search']);
  }

}

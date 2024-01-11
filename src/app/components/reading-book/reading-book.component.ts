import { Component, OnInit } from '@angular/core';
import ePub from 'epubjs';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-reading-book',
  templateUrl: './reading-book.component.html',
  styleUrls: ['./reading-book.component.css']
})
export class ReadingBookComponent implements OnInit {
  url = 'http://localhost:3000/ebooks/';
  link: any;
  book!: any;
  rendition!: any;
  chapters: [] = [];
  constructor(private appService: AppService) { }
  bookData: any;
  ngOnInit(): void {
    this.appService.bookData.subscribe((res: any): any => {
      this.bookData = res;
      this.link = this.url + this.bookData?.fileReader;
      this.book = ePub(this.link);
      this.rendition = this.book.renderTo('area', { width: 1000, height: 600 });
      console.log(this.book)
      console.log(this.rendition)
      this.rendition.display();
      this.rendition.show()
    })
  }

  clickNext() {
    if (this.rendition) {
      this.rendition.next();
    } else {
      console.error('Rendition is null.');
    }
  }

  clickPrev() {
    if (this.rendition) {
      this.rendition.prev();
    } else {
      console.error('Rendition is null.');
    }
  }

}

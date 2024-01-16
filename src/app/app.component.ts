import { Component, OnInit } from '@angular/core';
import ePub from 'epubjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  book!: any;
  ngOnInit(): void {
    this.book = ePub('http://localhost:3000/ebooks/How_to_Transform_Your_Life.epub');
    this.book.renderTo('area', { width: 1000, height: 1000 }).display();
    if (localStorage.getItem('isLoggedOut')) {
      location.reload()
      localStorage.removeItem('isLoggedOut')
    }
  }

}

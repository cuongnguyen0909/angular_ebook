import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  selectedChapter: any;
  chapters: any = [];
  constructor(
    private appService: AppService,
    private router: Router,
  ) { }
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
      // this.rendition.on('rendered', (section: any) => {
      //   let currentPage = section.href;
      //   console.log('Current Page:', currentPage);
      // });
      console.log(this.rendition.location())
    })
    this.book.ready.then(() => {
      let toc = this.book.navigation.toc;
      this.chapters = toc.map((chapter: any) => {
        return {
          label: chapter.label,
          href: chapter.href
        };
      });
    });

    if (location.pathname === '/reading-book') {
      this.appService.sendStatusShowHeader(false);
    }
    document.addEventListener('keydown', (event) => this.handleKeyPress(event));

  }

  displayChapter() {
    this.rendition.display(this.selectedChapter);
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

  private handleBackButton() {
    // Thực hiện các xử lý của bạn ở đây
    // Chẳng hạn, chuyển hướng tới trang home và hiển thị header
    this.appService.sendStatusShowHeader(true);

    const navigationExtras: NavigationExtras = {
      queryParams: { showHeader: true },
    };

    this.router.navigate(['/home'], navigationExtras);
  }

  backToHome() {
    this.appService.sendStatusShowHeader(true);
    this.router.navigate(['/home']);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    // Xử lý khi người dùng bấm nút "lùi" trên trình duyệt
    this.handleBackButton();
  }

  @HostListener('window:beforeunload', ['$event'])
  onWindowBeforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = '';
  }
  handleKeyPress(event: KeyboardEvent) {
    // Kiểm tra xem nút nào được bấm
    switch (event.key) {
      case '39': // Mã phím ">" (Right arrow)
        this.clickNext();
        break;
      case '37': // Mã phím "<" (Left arrow)
        this.clickPrev();
        break;
      // Các trường hợp khác nếu cần
    }
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: any) {
    if (event.keyCode === 39) {
      this.clickNext();
    } else if (event.keyCode === 37) {
      this.clickPrev();
    }
  }
}

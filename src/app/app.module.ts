import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BooksByGenresComponent } from './components/book-by-genres/book-by-genres.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { ReadingBookComponent } from './components/reading-book/reading-book.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomInterceptor } from './services/interceptors.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookSearchListComponent } from './components/book-search-list/book-search-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminComponent } from './components/manage/admin/admin.component';
import { AddBookComponent } from './components/manage/add-book/add-book.component'
import { BooksComponent } from './components/manage/books/books.component';
import { DashboardComponent } from './components/manage/dashboard/dashboard.component';
import { GenresComponent } from './components/manage/genres/genres.component';
import { UpdateBookComponent } from './components/manage/update-book/update-book.component';
import { UsersComponent } from './components/manage/users/users.component';
import { InfoDetailUserComponent } from './components/info-detail-user/info-detail-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipePipe } from './pipe/search-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    BooksByGenresComponent,
    BookDetailComponent,
    ReadingBookComponent,
    BookSearchListComponent,
    AdminComponent,
    AddBookComponent,
    BooksComponent,
    DashboardComponent,
    GenresComponent,
    UpdateBookComponent,
    UsersComponent,
    InfoDetailUserComponent,
    SearchPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { BooksByGenresComponent } from './components/book-by-genres/book-by-genres.component';
import { ReadingBookComponent } from './components/reading-book/reading-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookSearchListComponent } from './components/book-search-list/book-search-list.component';
import { AdminComponent } from './components/manage/admin/admin.component';
import { BooksComponent } from './components/manage/books/books.component';
import { GenresComponent } from './components/manage/genres/genres.component';
import { UsersComponent } from './components/manage/users/users.component';
import { DashboardComponent } from './components/manage/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'books-by-genres', component: BooksByGenresComponent },
  { path: 'reading-book', component: ReadingBookComponent },
  { path: 'book-search', component: BookSearchListComponent },
  { path: 'book-detail/:bid', component: BookDetailComponent },
  {
    path: 'manage/admin',
    component: AdminComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'books', component: BooksComponent },
      { path: 'genres', component: GenresComponent },
      { path: 'users', component: UsersComponent },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
  // { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

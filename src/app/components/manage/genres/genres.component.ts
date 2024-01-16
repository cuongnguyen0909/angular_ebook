import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { GenreService } from 'src/app/services/genre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  searchText: string = ''
  url = 'http://localhost:3000/images/';
  page: number = 1;
  thumb: any;
  formCreateGenre = new FormGroup({
    title: new FormControl(''),
  });
  formUpdateGenre = new FormGroup({
    title: new FormControl(''),
  });
  listGenres!: any;
  genreData!: any;
  constructor(
    private genreService: GenreService,
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.genreService.getAllGenres().subscribe((res: any): any => {
      this.listGenres = res?.data;
    })
    this.appService.genreData.subscribe(async (res: any) => {
      this.genreData = res;
      console.log(res)
      await this.formUpdateGenre.setValue({
        title: this.genreData?.title,
      })
    })
  }

  toggleAddGenre() {
    const addGenre = document.getElementById('addGenreComponent') as HTMLElement;
    addGenre.classList.toggle('active');
  }

  toggleUpdateGenre(genre: any) {
    const updateGenre = document.getElementById('updateGenreComponent') as HTMLElement;
    updateGenre.classList.toggle('active');
    this.appService.sendGenreData(genre);
    this.formUpdateGenre.setValue({
      title: genre?.title,
    })
  }

  removeAddGenre() {
    const addGenre = document.getElementById('addGenreComponent') as HTMLElement;
    addGenre.classList.remove('active');
  }

  removeUpdateGenre() {
    const updateGenre = document.getElementById('updateGenreComponent') as HTMLElement;
    updateGenre.classList.remove('active');

  }
  deleteGenre(id: any) {
    this.genreService.deleteGenre(id).subscribe((res: any): any => {
      if (res.status) {
        return Swal.fire({
          icon: 'success',
          title: 'Delete genre successfully',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
            this.router.navigate(['/manage/genres']);
          }
        })
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Delete genre failed',
          showConfirmButton: false,
          confirmButtonText: 'OK',
        })
      }
    })
  }
  onCreateGenre() {
    const formData = new FormData();
    const title: any = this.formCreateGenre.value?.title;
    formData.append('title', title);
    if (this.thumb) {
      formData.append('thumb', this.thumb, this.thumb.name);
    }
    this.genreService.createGenre(formData).subscribe((res: any): any => {
      if (res.status) {
        return Swal.fire({
          icon: 'success',
          title: 'Create genre successfully',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
            this.router.navigate(['/manage/genres']);
          }
        })
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Create genre failed',
          showConfirmButton: false,
          confirmButtonText: 'OK',
        })
      }
    })
  }

  clickIn(event: any) {
    event.stopPropagation();
  }

  onUpdateGenre() {
    const formData = new FormData();
    const title: any = this.formUpdateGenre.value?.title;
    formData.append('title', title);
    if (this.thumb) {
      formData.append('thumb', this.thumb, this.thumb?.name);
    }
    this.genreService.updateGenre(this.genreData._id, formData).subscribe((res: any): any => {
      if (res.status) {
        return Swal.fire({
          icon: 'success',
          title: 'Update genre successfully',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
            this.router.navigate(['/manage/genres']);
          }
        })
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Update genre failed',
          showConfirmButton: false,
          confirmButtonText: 'OK',
        })
      }
    })
  }
  setUrlImage(image: any) {
    return `${this.url}${image}`;
  }

  selectImage(event: any) {
    this.thumb = event.target.files[0];
    console.log(this.thumb)
  }
}

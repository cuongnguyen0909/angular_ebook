import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookByGenresComponent } from './book-by-genres.component';

describe('BookByGenresComponent', () => {
  let component: BookByGenresComponent;
  let fixture: ComponentFixture<BookByGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookByGenresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookByGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

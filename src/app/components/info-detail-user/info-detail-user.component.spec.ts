import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDetailUserComponent } from './info-detail-user.component';

describe('InfoDetailUserComponent', () => {
  let component: InfoDetailUserComponent;
  let fixture: ComponentFixture<InfoDetailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDetailUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

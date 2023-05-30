import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePostsComponent } from './make-posts.component';

describe('MakePostsComponent', () => {
  let component: MakePostsComponent;
  let fixture: ComponentFixture<MakePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

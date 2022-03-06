import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsFilterComponent } from './posts-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PostsFilterComponent', () => {
  let component: PostsFilterComponent;
  let fixture: ComponentFixture<PostsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsFilterComponent],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { API_BASE_URL } from '../app.module';
import { GetPostResponse } from '../models/response/get-post-response';
import { GetUserResponse } from '../models/response/get-user-response';
import { PostService } from '../services/post/post.service';
import { FilterOptions } from './components/posts-filter/filter-options';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let mockPostService = jasmine.createSpyObj("PostService", ["getAll"]);
  let mockUserService = jasmine.createSpyObj("UserSservice", ["getAll"]);

  let postResponseMock: GetPostResponse = {
    id: 1,
    userId: 1,
    title: 'post title',
    body: 'post body'
  }

  let usersResponseMock: Partial<GetUserResponse> = {
    id: 1,
    name: 'name',
    username: 'username',
    email: 'email',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        PostsComponent,
        PostsFilterComponent
      ],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: API_BASE_URL, useValue: '' }
      ]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockPostService.getAll.and.returnValue(of([postResponseMock]))
    mockUserService.getAll.and.returnValue(of([usersResponseMock]))
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router navigate() with proper arguments onFilterClick()', () => {
    const router = TestBed.inject(Router);
    const route = TestBed.inject(ActivatedRoute);
    const spy = spyOn(router, 'navigate').and.callThrough();
    component.onFilterClick();
    expect(spy).toHaveBeenCalledWith([], { relativeTo: route, queryParams: component.filterForm.value });
  })

  it('should clear form and call onFilterClick() when onFilterClearClick() called', () => {
    const usersNameQuery = 'query'
    const spy = spyOn(component, 'onFilterClick').and.callThrough();
    component.filterForm.setValue(new FilterOptions({ usersNameQuery }))
    component.onFilterClearClick();
    expect(component.filterForm.value.usersNameQuery).toBe('');
    expect(spy).toHaveBeenCalled();
  })

});

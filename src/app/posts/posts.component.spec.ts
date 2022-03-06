import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { API_BASE_URL } from '../app.module';
import { GetPostResponse } from '../models/response/get-post-response';
import { GetUserResponse } from '../models/response/get-user-response';
import { PostService } from '../services/post/post.service';
import { UserService } from '../services/user/user.service';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';

import { PostsComponent } from './posts.component';

fdescribe('PostsComponent', () => {
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

});

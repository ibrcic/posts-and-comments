import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from 'src/app/app.module';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CommentService } from './comment.service';
import { of } from 'rxjs';

describe('CommentService', () => {
  let service: CommentService;
  let getAllPostSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: API_BASE_URL, useValue: environment.baseApiUrl }
      ],
    });
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCommentListItemsForPost should map the response to CommentListItem[]', (done: DoneFn) => {

    const post = {
      id: 11,
      postId: 11,
      name: 'name',
      email: 'email',
      body: 'body'
    }

    const spy = spyOn(service, 'getAllForPost').and.returnValue(of([post]))
    service.getCommentListItemsForPost(1).subscribe((response: any) => { // Any so we can test if mapping works.
      const post = response[0]
      expect(response.length).toEqual(1);

      // Should map those properties
      expect(post.name).toBe(post.name);
      expect(post.body).toBe(post.body);
      expect(post.email).toBe(post.email);

      // Should not map e.g. postId
      expect(post.postId).toBeUndefined();
      done();
    })
  });
});

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.module';
import { CommentListItem } from 'src/app/shared-modules/comment-list/comment-list/comment-list-item';
import { GetCommentResponse } from 'src/app/models/response/get-comment-response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {
  }

  getAllForPost(postId: number): Observable<GetCommentResponse[]> {
    const url = `${this.baseUrl}/comments?postId=${postId}`;
    return this.http.get<GetCommentResponse[]>(url);
  }

  /**
   * Kind of a helper method that gets the comments for post id as well
   * as maps the response into array of CommentListItem objects
   * needed for out CommentListComponent.
   * @param postId id of posts to get comments for
   * @returns Observable returning CommentListItem[]
   */
  getCommentListItemsForPost(postId: number): Observable<CommentListItem[]> {
    return this.getAllForPost(postId).pipe(map(response => {
      return response.map(c => {
        const comment = {
          name: c.name,
          body: c.body,
          email: c.email
        } as CommentListItem;
        return comment;
      })
    }));
  }
}

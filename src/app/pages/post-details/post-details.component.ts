import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { CommentListItem } from 'src/app/components/comment-list/comment-list-item';
import { GetPostResponse } from 'src/app/models/response/get-post-response';
import { GetUserResponse } from 'src/app/models/response/get-user-response';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post?: GetPostResponse;
  user?: GetUserResponse;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    const postId = +this.route.snapshot.params['postId']

    this.postService.getById(postId).pipe(tap(post => this.getUser(post.userId))).subscribe(post => {
      this.post = post;
    })


  }

  getUser(userId: number) {
    this.userService.getById(userId).subscribe(user => this.user = user);
  }

  getCommentsForPost(postId: number): Observable<CommentListItem[]> {
    return this.commentService.getCommentListItemsForPost(postId);
  }
}

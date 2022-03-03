import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, distinctUntilChanged, forkJoin, map, mergeMap, Observable, of, tap } from 'rxjs';
import { CommentListItem } from 'src/app/components/comment-list/comment-list-item';
import { PostListItem } from 'src/app/components/post-list-item/post-list-item';
import { FilterOptions } from 'src/app/components/posts-filter/filter-options';
import { GetPostResponse } from 'src/app/models/response/get-post-response';
import { GetUserResponse } from 'src/app/models/response/get-user-response';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  /**
   * Maps GetPostResponse and GetUserResponse array to array of appropriate
   * type needed by PostListItemComponent.
   * @returns Array of PostListItem objects.
   */
  mapToPostListItems = ([posts, users]: [GetPostResponse[], GetUserResponse[]]) => {
    return posts.map(p => {
      const postListItem: PostListItem = {
        id: p.id,
        title: p.title,
        body: p.body
      }

      const user = users.find(u => u.id === p.userId);
      if (user) {
        postListItem.user = {
          username: user.username,
          name: user.name,
          email: user.email
        }
      }
      return postListItem;
    })
  }

  // Observable tracking changes to the filter, we get those changes from router so that
  // even on page reload, filter is preserved.
  filterChange$: Observable<FilterOptions> = this.route.queryParams.pipe(
    distinctUntilChanged(), // No need to re-emit if nothing changed.
    map(params => new FilterOptions(params)), // Create actual object.
    tap(filterOptions => this.filterForm.setValue(filterOptions)) // Update form control if user got to the page via link.
  );

  // Post and user data, merged to appropriate type needed for PostListItemComponent.

  postsListData$: Observable<PostListItem[]> = combineLatest([
    this.postService.getAll(),
    this.userService.getAll()
  ]).pipe(map(this.mapToPostListItems))

  filteredPostList$: Observable<PostListItem[]> = this.filterChange$.pipe(
    mergeMap(filterOptions => forkJoin([of(filterOptions), this.postsListData$])),
    map(([filterOptions, posts]) => {
      // Currently filtering only by user's name as that is the only data visible,
      // can easily add more filters depending on the requirements.
      if (!filterOptions?.usersNameQuery) {
        return posts;
      }

      const userQuery = filterOptions.usersNameQuery.toLocaleLowerCase();
      return posts.filter(p => p.user?.name.toLocaleLowerCase().includes(userQuery));
    })
  )


  filterForm = new FormControl();
  expandedPostId = -1; // Post id that is currently expanded to show comments.

  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  onFilterClick() {
    // Navigagte to current route while just updating query params.
    this.router.navigate([], { relativeTo: this.route, queryParams: this.filterForm.value });
  }

  onFilterClearClick() {
    // Simply navigate to same page without query params.
    this.filterForm.setValue(new FilterOptions());
    this.onFilterClick();
  }

  expandCommentsClick(postId: number) {

    // Collapse
    if (postId === this.expandedPostId) {
      this.expandedPostId = -1;
      return;
    }

    this.expandedPostId = postId;
  }

  getCommentsForPost(postId: number): Observable<CommentListItem[]> {
    return this.commentService.getCommentListItemsForPost(postId);
  }


}
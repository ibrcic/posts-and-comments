import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentListItem } from './comment-list-item';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit {

  _comments: CommentListItem[] = [];

  // We accept both Observable and direct list of CommentListItems.
  // The client can decide which implementation suits him best.
  @Input() comments: CommentListItem[] | Observable<CommentListItem[]> = [];

  constructor() { }

  ngOnInit(): void {
    if (this.comments instanceof Array) {
      this._comments = this.comments;
    } else if (this.comments instanceof Observable) {
      this.comments.subscribe(response => {
        this._comments = response;
      })
    }
  }

}

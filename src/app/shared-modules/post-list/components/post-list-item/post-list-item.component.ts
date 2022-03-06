import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PostListItem } from './post-list-item';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListItemComponent implements OnInit {

  @Input() post?: PostListItem;

  constructor() { }

  ngOnInit(): void {
  }

}

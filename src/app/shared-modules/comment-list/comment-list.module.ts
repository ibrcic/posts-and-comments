import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';



@NgModule({
  declarations: [
    CommentListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommentListComponent
  ]
})
export class CommentListModule { }

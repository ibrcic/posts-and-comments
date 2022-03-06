import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details.component';
import { RouterModule, Routes } from '@angular/router';
import { CommentListModule } from '../shared-modules/comment-list/comment-list.module';

const routes: Routes = [
  {
    path: '',
    component: PostDetailsComponent
  }
];

@NgModule({
  declarations: [
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommentListModule,
  ]
})
export class PostDetailsModule { }

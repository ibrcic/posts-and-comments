import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostListModule } from '../shared-modules/post-list/post-list.module';
import { CommentListModule } from '../shared-modules/comment-list/comment-list.module';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  }
];

@NgModule({
  declarations: [
    PostsComponent,
    PostsFilterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PostListModule,
    CommentListModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }

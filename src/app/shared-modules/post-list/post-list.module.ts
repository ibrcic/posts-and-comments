import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';



@NgModule({
  declarations: [
    PostListItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostListItemComponent
  ]
})
export class PostListModule { }

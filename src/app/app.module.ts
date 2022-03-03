import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment, Environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './pages/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export const API_BASE_URL = new InjectionToken<Environment>('api.base.url');

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostListItemComponent,
    PostsFilterComponent,
    CommentListComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.baseApiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

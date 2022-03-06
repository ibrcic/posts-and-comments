import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommentListItem } from './comment-list-item';

import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  let cd: ChangeDetectorRef;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [CommentListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    cd = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render article for each comment', () => {
    let comments: CommentListItem[] = [{
      name: '',
      body: '',
      email: ''
    }, {
      name: '',
      body: '',
      email: ''
    }];

    component.ngOnInit();
    component.comments = comments;
    fixture.detectChanges();
    cd.detectChanges();
    let articles = fixture.debugElement.queryAll(By.css('article'));
    expect(articles.length).toEqual(comments.length);
  });

});

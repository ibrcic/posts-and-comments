import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PostListItemComponent } from './post-list-item.component';

@Component({
  template: '<app-post-list-item><span post-list-item-actions>testing</span></app-post-list-item>'
})
export class PostListItemContentProjectionWorkingTest {
}

describe('PostListItemComponent', () => {
  let component: PostListItemComponent;
  let fixture: ComponentFixture<PostListItemComponent>;
  let cd: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListItemComponent, PostListItemContentProjectionWorkingTest],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListItemComponent);
    component = fixture.componentInstance;
    cd = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title, body and user name', () => {
    const post = {
      id: 1,
      title: '#title123#',
      body: '#body123#',
      user: {
        name: '#name123#',
        username: '',
        email: ''
      }
    }

    component.post = post;
    cd.detectChanges();

    // quick and dirty text that text actually renders, depends on actual values being unique
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(post.title);
    expect(text).toContain(post.body);
    expect(text).toContain(post.user.name);
  });

  it('should render content projected action bar', () => {
    let contentProjectedComponent = TestBed.createComponent(PostListItemContentProjectionWorkingTest)
    expect(contentProjectedComponent).toBeDefined();

    const projected = contentProjectedComponent.debugElement.query(By.css('[post-list-item-actions]'));
    expect(projected).not.toBeNull();
  })

});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsFilterComponent } from './posts-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterOptions } from './filter-options';

describe('PostsFilterComponent', () => {
  let component: PostsFilterComponent;
  let fixture: ComponentFixture<PostsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsFilterComponent],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the form with writeValue', () => {
    const usersNameQuery = 'query'
    component.writeValue(new FilterOptions({usersNameQuery}))
    expect(component.form.value.usersNameQuery).toBe(usersNameQuery);
  });

  it('registerOnChange should set the onChange function', () => {
    const func = () => {};
    component.registerOnChange(func);
    expect(component.onChange).toBe(func);
  });

  it('registerOnTouched should set the onTouched function', () => {
    const func = () => {};
    component.registerOnTouched(func);
    expect(component.onTouched).toBe(func);
  });

  it('should call onChange on form value change', () => {
    component.ngOnInit();
    const outputSpy = spyOn(component, 'onChange').and.callThrough();
    component.writeValue(new FilterOptions())
    expect(outputSpy).toHaveBeenCalled();
  });

  it('should emit to filterOptionsChange on form value change', () => {
    component.ngOnInit();
    const outputSpy = spyOn(component.filterOptionsChange, 'next').and.callThrough();
    component.writeValue(new FilterOptions())
    expect(outputSpy).toHaveBeenCalled();
  });

});

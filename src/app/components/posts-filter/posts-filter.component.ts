import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterOptions } from './filter-options';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PostsFilterComponent),
      multi: true
    }
  ]
})
export class PostsFilterComponent implements OnInit, ControlValueAccessor {

  // In case consumer of this component doesn't want to use ControlValueAccessor to access value.
  @Output() filterOptionsChange = new EventEmitter<FilterOptions>();

  form: FormGroup = this.fb.group({
    usersNameQuery: []
  });

  onChange = (filterOptions: FilterOptions) => { };
  onTouched = () => { };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Every time a value changes, we want to emit it to consumer of this custom form control either by using @Output or form.
    this.form.valueChanges.subscribe(value => { 
      const filterOptions = new FilterOptions();
      filterOptions.usersNameQuery = value.usersNameQuery;
      this.filterOptionsChange.next(filterOptions);
      this.onChange(filterOptions);
    })
  }

  writeValue(value: FilterOptions): void {
    if (!value) { 
      return;
    }
    this.form.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}

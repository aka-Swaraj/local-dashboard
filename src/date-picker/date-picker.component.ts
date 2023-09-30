import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { fromDate, toDate } from '../utils';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  imports: [CommonModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DatePickerComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DatePickerComponent,
    },
  ],
})
export class DatePickerComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() date: Date | null = null;
  @Input() max: Date | null = null;
  @Input() min: Date | null = null;
  @Input() disabled: boolean = false;

  value: any = null;
  dateValue = '';

  maxDate = '';
  minDate = '';

  onChange = (_: Date) => {};
  onTouch = () => {};
  onValidationChange = () => {};

  constructor() {}
  writeValue(date: any): void {
    console.log({ write: date });
    if (!date) return;
    this.date = new Date(date);
    this.dateValue = fromDate(this.date);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let hasError = false;
    let errors: any = {};
    if (!control.valid) {
      hasError = true;
      errors = { ...errors, ...control.errors };
    }
    return hasError ? errors : null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

  ngOnInit() {
    if (this.date) {
      this.dateValue = fromDate(this.date);
    } else {
      this.dateValue = '';
    }
    if (this.max) this.maxDate = fromDate(this.max);
    if (this.min) this.minDate = fromDate(this.min);
  }

  onDateChange(event: any) {
    if (this.disabled) return;
    const selected = event.target.value;
    this.value = selected;
    this.date = toDate(selected);
    this.onChange(this.date);
  }
}

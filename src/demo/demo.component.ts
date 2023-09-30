import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toReadable } from '../utils';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { TimePickerComponent } from '../time-picker/time-picker.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TimePickerComponent,
    DatePickerComponent,
  ],
})
export class DemoComponent implements OnInit {
  selectedDate = null; //new Date(2023, 8, 22);
  minDate = new Date(2023, 6, 22);
  maxDate = new Date(2023, 10, 22);

  countdown = 0;
  target = new Date(2023, 11, 25, 10, 0, 0, 0);

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.countdown = toReadable(this.target.getTime() - new Date().getTime());
    }, 1000);
  }
}

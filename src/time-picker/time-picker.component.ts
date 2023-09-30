import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class TimePickerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'my-app',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
  <router-outlet></router-outlet>
  `,
})
export class App {}

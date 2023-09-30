import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './routes';

import { App } from './app';

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});

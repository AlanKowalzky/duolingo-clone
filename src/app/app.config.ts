import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CustomPreloadingStrategy } from './core/services/preload-strategy.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, 
      withComponentInputBinding(),
      withPreloading(CustomPreloadingStrategy)
    ),
    provideHttpClient()
  ]
};

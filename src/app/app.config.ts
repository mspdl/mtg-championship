import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import {
  initializeFirestore,
  persistentLocalCache,
  provideFirestore,
} from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const app = initializeApp(environment.firebase);
      return initializeFirestore(app, {
        localCache: persistentLocalCache(),
      });
    }),
  ],
};

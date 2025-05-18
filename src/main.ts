import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyBLxMBc9S7_a5IfkLZbhZSqfFiGTCGFK_E",
        authDomain: "eskuvo-8752b.firebaseapp.com",
        projectId: "eskuvo-8752b",
        storageBucket: "eskuvo-8752b.appspot.com",
        messagingSenderId: "818853170409",
        appId: "1:818853170409:web:26f699d4bc4122c541f478"
      })
    ),

    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
});

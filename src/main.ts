import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AdminService } from './app/services/admin.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // ✅ Provide routing
    provideHttpClient(),    // ✅ Provide HttpClient
    AdminService, provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()            // ✅ Provide AdminService manually
  ],
}).catch(err => console.error(err));



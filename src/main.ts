import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { admininterInterceptor } from './app/interceptors/admininter.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule),provideRouter(routes), provideAnimationsAsync(),provideHttpClient(withInterceptors([authInterceptor,admininterInterceptor])), importProvidersFrom(SocialLoginModule),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('30888120997-ccsgddfpv26kbh80sl1jeu7n6k2l30d1.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig
    }]
});

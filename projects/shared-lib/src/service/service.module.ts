import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication/authentication.service';
import { HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { I18nService } from './i18n/i18n.service';
import { ProgressBarService } from './progress-bar/progress-bar.service';
import { ProgressInterceptor } from './progress-bar/progress.interceptor';
import { RouteReuseStrategy } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { AuthenticationInterceptor } from './authentication/authentication.interceptor';
import { HttpCacheService } from './http/http-cache.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { HttpService } from './http/http.service';
import { CacheInterceptor } from './http/cache.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { RouteReusableStrategy } from './route/route-reusable-strategy';
import { SettingService } from './setting/setting.service';
import { GeneralService } from './general/general.service';
import { AutoService } from './auto.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SettingService,
    AutoService,
    GeneralService,
    AuthenticationService,
    AuthenticationGuard,
    AuthenticationInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    {
      provide: HttpClient,
      useClass: HttpService
    },

    ProgressBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressInterceptor,
      multi: true
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class ServiceModule {
}

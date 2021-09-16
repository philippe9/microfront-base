import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { ConfigComponent } from './config/config.component';
// import { SharedLibModule } from '../../../shared-lib/src/public-api';
import { UserMenuBadgeComponent } from './user-menu-badge/user-menu-badge.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from 'projects/shared-lib/src/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AuthenticationInterceptor } from 'projects/shared-lib/src/public-api';
import { ServiceModule } from '../../../shared-lib/src/service/service.module';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    MenubarModule,
    HttpClientModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    CoreModule,
    ServiceModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ConfigComponent,
    UserMenuBadgeComponent
  ],
  providers: [AuthenticationInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }

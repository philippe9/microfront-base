import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { ConfigComponent } from './config/config.component';
import { SharedLibModule } from 'projects/shared-lib/src/public-api';
import { UserMenuBadgeComponent } from './user-menu-badge/user-menu-badge.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    SharedLibModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ConfigComponent,
    UserMenuBadgeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

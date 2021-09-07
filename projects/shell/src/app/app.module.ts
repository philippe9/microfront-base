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

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    MenubarModule
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

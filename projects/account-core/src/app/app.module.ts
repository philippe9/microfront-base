import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountParentModule } from './account-parent/account-parent.module';
import { AccountHistoryResolver } from './account-parent/account-history.resolver';
import { AccountResolver } from './account-parent/account.resolver';
import { MaterialModule } from '../../../shared-lib/src/material/material.module';
import { AccountParentRoutingModule } from './account-parent/account-parent-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AccountParentModule,
    AccountParentRoutingModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AccountHistoryResolver, AccountResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

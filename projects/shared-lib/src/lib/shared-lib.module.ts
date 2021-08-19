import { NgModule } from '@angular/core';
import { SharedLibComponent } from './shared-lib.component';
import { OtherComponent } from './other/other.component';
import { ShButtonComponent } from './sh-button/sh-button.component';
import { ShToolbarComponent } from './sh-toolbar/sh-toolbar.component';



@NgModule({
  declarations: [SharedLibComponent, OtherComponent, ShButtonComponent, ShToolbarComponent],
  imports: [
  ],
  exports: [SharedLibComponent, OtherComponent, ShButtonComponent, ShToolbarComponent]
})
export class SharedLibModule { }

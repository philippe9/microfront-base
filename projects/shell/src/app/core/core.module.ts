import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { ContentComponent } from './shell/content/content.component';
import { SidenavComponent } from './shell/sidenav/sidenav.component';
import { ToolbarComponent } from './shell/toolbar/toolbar.component';
// import { MaterialModule } from '../material/material.module';
// import { IconsModule } from '../material/icons.module';
import { FooterComponent } from './shell/footer/footer.component';
import { BreadcrumbComponent } from './shell/breadcrumb/breadcrumb.component';
import { MaterialModule } from 'projects/shared-lib/src/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '/material/material.module';
import { IconsModule } from 'projects/shared-lib/src/material/icons.module';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    ShellComponent,
    BreadcrumbComponent,
    ContentComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
  ],
  exports: [
    ShellComponent,
    BreadcrumbComponent,
    ContentComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreRoutingModule

  ]
})
export class CoreModule { }

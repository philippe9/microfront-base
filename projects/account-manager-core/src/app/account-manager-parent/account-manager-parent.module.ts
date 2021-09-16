import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager/manager.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddChipsComponent } from './add-chips/add-chips.component';
import { TypeOperationViewComponent } from './type-operation-view/type-operation-view.component';
import { TypeCompteViewComponent } from './type-compte-view/type-compte-view.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { CoreModule } from '@angular/flex-layout';
import { ManagerHistoryComponent } from './manager-history/manager-history.component';
import { ChangeManagerComponent } from './change-manager/change-manager.component';
import { MaterialModule } from 'projects/shared-lib/src/material/material.module';
import { TemplateModule } from 'projects/shared-lib/src/template/template.module';
import { AccountManagerParentRoutingModule } from './account-manager-parent-routing.module';
import { AccountManagerResolver } from './account-manager.resolver';
import { AccountManagerService } from './account-manager.service';
import { ApiService } from 'projects/shared-lib/src/template/api.service';
@NgModule({
  declarations: [
    ManagerComponent, ManagerViewComponent,
    ManagerHistoryComponent, AddChipsComponent,
    TypeOperationViewComponent, TypeCompteViewComponent,
    DeleteModalComponent,
    ChangeManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialModule,
    TemplateModule,
    AccountManagerParentRoutingModule
  ],
  providers: [AccountManagerResolver, AccountManagerService, ApiService],

})
export class AccountManagerParentModule { }

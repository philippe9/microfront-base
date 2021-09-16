import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';
import { environment } from '../../../../shared-lib/src/environments/environment.prod';
import { AccountManagerResolver } from './account-manager.resolver';
import { ManagerHistoryComponent } from './manager-history/manager-history.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { ManagerComponent } from './manager/manager.component';
import { ChangeManagerComponent } from './change-manager/change-manager.component';


let env = environment.routes;

const routes: Routes = [

  {
    path: 'view/:id',
    component: ManagerViewComponent,
    resolve: {
      Response: AccountManagerResolver,
    },
    data: {
      mode: Dialog.CONSULTATION
    }
  },
  {
    path: 'edit/:id',
    component: ManagerViewComponent,
    resolve: {
      Response: AccountManagerResolver,
    },
    data: {
      mode: Dialog.MODIFICATION
    }
  },
  {
    path: 'create',
    component: ManagerViewComponent,
    data: {
      mode: Dialog.CREATION
    }
  },

  {
    path: env.accountManager.url,
    component: ManagerComponent,
    data: { title: 'Clients', breadcrumb: env.accountManager.breadcumb },
  },
  {
    path: 'view/:code',
    component: ManagerViewComponent,
    resolve: {
      Response: AccountManagerResolver,
    },
    data: {
      mode: Dialog.CONSULTATION
    }
  },
  {
    path: 'edit/:code',
    component: ManagerViewComponent,
    resolve: {
      Response: AccountManagerResolver,
    },
    data: {
      mode: Dialog.CONSULTATION
    }
  },
  {
    path: 'create',
    component: ManagerViewComponent,
    resolve: {
      Response: AccountManagerResolver,
    },
    data: {
      mode: Dialog.CREATION
    }
  },
  {
    path: env.accountManagerView.url,
    component: ManagerViewComponent,
    data: { title: "Groups", breadcrumb: env.accountManagerView.breadcumb },
  },
  {
    path: env.accountManagerHistory.url,
    component: ManagerHistoryComponent,
    data: { Title: "Morale", breadcrumb: env.accountManagerHistory.breadcumb },
  },
  {
    path: env.changementGestionnaire.url,
    component: ChangeManagerComponent,
    data: { Title: "Morale", breadcrumb: env.changementGestionnaire.breadcumb },
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagerParentRoutingModule { }

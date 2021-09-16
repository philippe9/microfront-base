import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { extract } from 'src/app/service/i18n/i18n.service';
// import { Route } from 'src/app/core/route.service';
import { environment } from '../../../../shared-lib/src/environments/environment.prod';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountHistoryComponent } from './account-history/account-history.component';
import { AccountPositionComponent } from './account-position/account-position.component';
import { AccountReservationListComponent } from './account-reservation-list/account-reservation-list.component';
import { AccountReservationViewComponent } from './account-reservation-view/account-reservation-view.component';
import { SleeperAccountListComponent } from './sleeper-account-list/sleeper-account-list.component';
import { AccountOppositionListComponent } from './account-opposition-list/account-opposition-list.component';
import { AccountOppositionViewComponent } from './account-opposition-view/account-opposition-view.component';
import { AccountClosedListComponent } from './account-closed-list/account-closed-list.component';
import { AccountClosedViewComponent } from './account-closed-view/account-closed-view.component';
import { AccountViewComponent } from './account-view/account-view.component';
import { AccountResolver } from './account.resolver';
// import { Dialog } from 'src/app/domain/dialog.enum';
import { PositionAccountHistoryComponent } from './position-account-history/position-account-history.component';
import { AccountCancelOppositionComponent } from './account-cancel-opposition/account-cancel-opposition.component';
import { AccountHistoryResolver } from './account-history.resolver';
import { AccountCancelReservationComponent } from './account-cancel-reservation/account-cancel-reservation.component';
import { ImpressionRibComponent } from './impression-rib/impression-rib.component';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';

let env = environment.routes;
const routes: Routes = [
  {
    path: 'view/:cle/:num',
    component: AccountViewComponent,
    resolve: {
      Response: AccountResolver,
    },
    data: {
      mode: Dialog.CONSULTATION
    }
  },
  {
    path: 'edit/:cle/:num',
    component: AccountViewComponent,
    resolve: {
      Response: AccountResolver,
    },
    data: {
      mode: Dialog.MODIFICATION
    }
  },
  {
    path: 'create',
    component: AccountViewComponent,
    data: {
      mode: Dialog.CREATION
    }
  },
  {
    path: 'validate/:cle/:num',
    component: AccountViewComponent,
    resolve: {
      Response: AccountResolver,
    },
    data: {
      mode: Dialog.VALIDATION
    }
  },
  {
    path: env.account.url,
    component: AccountListComponent,
    data: { title: "Clients", breadcrumb: env.account.breadcumb },
    resolve: {}
  },
  {
    path: '',
    component: AccountListComponent,
    data: { title: "Clients", breadcrumb: env.account.breadcumb },
    resolve: {}
  },
  {
    path: env.accountHistory.url,
    component: AccountHistoryComponent,
    data: { title: "Clients", breadcrumb: env.accountHistory.breadcumb },
    resolve: {}
  },
  {
    path: env.accountPosition.url,
    component: AccountPositionComponent,
    data: { title: "Clients", breadcrumb: env.accountPosition.breadcumb },
    resolve: {}
  },
  {
    path: env.reservation.url,
    component: AccountReservationListComponent,
    data: { title: "Clients", breadcrumb: env.reservation.breadcumb },
    resolve: {}
  },
  {
    path: env.reservationView.url,
    component: AccountReservationViewComponent,
    data: { title: "Clients", breadcrumb: env.reservationView.breadcumb },
    resolve: {}
  },
  {
    path: env.sleeperAccount.url,
    component: SleeperAccountListComponent,
    data: { title: "Clients", breadcrumb: env.sleeperAccount.breadcumb },
    resolve: {}
  },
  {
    path: env.accountOpposition.url,
    component: AccountOppositionListComponent,
    data: { title: "Clients", breadcrumb: env.accountOpposition.breadcumb },
    resolve: {}
  },
  {
    path: env.oppositionView.url,
    component: AccountOppositionViewComponent,
    data: { title: "Clients", breadcrumb: env.oppositionView.breadcumb },
    resolve: {}
  },
  {
    path: env.closedAccount.url,
    component: AccountClosedListComponent,
    data: { title: "Clients", breadcrumb: env.closedAccount.breadcumb },
    resolve: {}
  },
  {
    path: env.closedAccountView.url,
    component: AccountClosedViewComponent,
    data: { title: "Clients", breadcrumb: env.closedAccountView.breadcumb },
    resolve: {}
  },
  {
    path: env.accountPositionHistory.url,
    component: PositionAccountHistoryComponent,
    data: { title: "Clients", breadcrumb: env.accountPositionHistory.breadcumb },
    resolve: {}
  },
  {
    path: env.accountCancelReservation.url,
    component: AccountCancelReservationComponent,
    data: { title: "Clients", breadcrumb: env.accountCancelReservation.breadcumb },
    resolve: {}
  },
  {
    path: env.accountCancelReservation.url,
    component: AccountCancelReservationComponent,
    data: { title: "Clients", breadcrumb: env.accountCancelReservation.breadcumb },
  },
  {
    path: env.accountCancelOpposition.url,
    component: AccountCancelOppositionComponent,
    data: { title: "Clients", breadcrumb: env.accountCancelOpposition.breadcumb },
    resolve: {}
  },
  {
    path: env.impressionRIB.url,
    component: ImpressionRibComponent,
    data: { title: "Clients", breadcrumb: env.impressionRIB.breadcumb },
    resolve: {}
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountParentRoutingModule { }

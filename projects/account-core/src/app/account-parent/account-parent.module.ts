
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountListComponent } from './account-list/account-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared-lib/src/material/material.module';
import { TemplateModule } from 'projects/shared-lib/src/template/template.module';
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
// import { PipesModule } from 'src/app/core/pipes/pipes.module';
// import { EtatComptePipe } from 'src/app/core/pipes/etat-compte.pipe';
import { PositionAccountHistoryComponent } from './position-account-history/position-account-history.component';
import { AccountCancelOppositionComponent } from './account-cancel-opposition/account-cancel-opposition.component';
import { AccountCancelReservationComponent } from './account-cancel-reservation/account-cancel-reservation.component';
import { ImpressionRibComponent } from './impression-rib/impression-rib.component';
import { ConsultationLotsComponent } from './consultation-lots/consultation-lots.component';
// import { AutonumericModule } from '@angularfy/autonumeric';
import { AccountParentRoutingModule } from './account-parent-routing.module';


@NgModule({
  declarations: [
    AccountListComponent,
    AccountHistoryComponent,
    AccountPositionComponent,
    AccountReservationListComponent,
    AccountReservationViewComponent,
    SleeperAccountListComponent,
    AccountOppositionListComponent,
    AccountOppositionViewComponent,
    AccountClosedListComponent,
    AccountClosedViewComponent,
    AccountViewComponent,
    PositionAccountHistoryComponent,
    AccountCancelReservationComponent,
    AccountCancelOppositionComponent,
    ImpressionRibComponent,
    ConsultationLotsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TemplateModule,
    FormsModule,
    AccountParentRoutingModule,
  ],
  providers: []
})


export class AccountParentModule { }

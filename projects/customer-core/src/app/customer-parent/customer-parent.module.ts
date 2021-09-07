import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicPersonListComponent } from './physic-person-list/physic-person-list.component';
import { MoralPersonListComponent } from './moral-person-list/moral-person-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhysicPersonResolver } from './resolver/physic-person.resolver';
import { MoralPersonResolver } from './resolver/moral-person.resolver';
// import { CustomerRoutingModule } from './customer-routing.module';
// import { MaterialModule } from '../../material/material.module';
// import { TemplateModule } from 'src/app/template/template.module';
import { MoralPersonViewComponent } from './moral-person-view/moral-person-view.component';
import { PhysicalPersonViewComponent } from './physical-person-view/physical-person-view.component';
import { DeceasedCustomerListComponent } from './deceased-customer-list/deceased-customer-list.component';
import { DeceasedCustomerViewComponent } from './deceased-customer-view/deceased-customer-view.component';
import { MoralShareholderDialogComponent } from './moral-shareholder-dialog/moral-shareholder-dialog.component';
import { PhysicShareholderDialogComponent } from './physic-shareholder-dialog/physic-shareholder-dialog.component';
import { AddPersonDialogComponent } from './add-person-dialog/add-person-dialog.component';
import { CreatePersonDialogComponent } from './create-person-dialog/create-person-dialog.component';
import { CustomerOppositionListComponent } from './customer-opposition-list/customer-opposition-list.component';
import { CustomerOppositionViewComponent } from './customer-opposition-view/customer-opposition-view.component';
import { TemplateModule } from 'projects/shared-lib/src/template/template.module';
// import { DateFormatPipe } from 'src/app/core/pipes/date-format.pipe';
// import { NatureClientPipe } from 'src/app/core/pipes/nature-client.pipe';
// import { PipesModule } from 'src/app/core/pipes/pipes.module';
// import { AutonumericModule } from '@angularfy/autonumeric';
import { MaterialModule } from '../../../../shared-lib/src/material/material.module';
import { CustomerParentRoutingModule } from './customer-parent-routing.module';
import { RouterModule } from '@angular/router';
import { BaseCustomerComponentComponent } from './base-customer-component/base-customer-component.component';
import { CustomerPhysiqueComponent } from './customer-physique/customer-physique.component';
import { CustomerMoralComponent } from './customer-moral/customer-moral.component';

@NgModule({
  declarations: [
    PhysicPersonListComponent,
    MoralPersonListComponent,
    MoralPersonViewComponent,
    PhysicalPersonViewComponent,
    DeceasedCustomerListComponent,
    DeceasedCustomerViewComponent,
    MoralShareholderDialogComponent,
    PhysicShareholderDialogComponent,
    AddPersonDialogComponent,
    MoralShareholderDialogComponent,
    PhysicShareholderDialogComponent,
    CreatePersonDialogComponent,
    CustomerOppositionListComponent,
    CustomerOppositionViewComponent,
    BaseCustomerComponentComponent,
    CustomerPhysiqueComponent,
    CustomerMoralComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TemplateModule,
    CustomerParentRoutingModule
  ],
  providers: [
    PhysicPersonResolver,
    MoralPersonResolver
  ]
})
export class CustomerModule {
}

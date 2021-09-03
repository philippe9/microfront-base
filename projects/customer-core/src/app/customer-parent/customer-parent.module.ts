import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerParentRoutingModule } from './customer-parent-routing.module';
import { CustomerPhysiqueComponent } from './customer-physique/customer-physique.component';
import { CustomerMoralComponent } from './customer-moral/customer-moral.component';
import { BaseCustomerComponentComponent } from './base-customer-component/base-customer-component.component';


@NgModule({
  declarations: [
    CustomerPhysiqueComponent,
    CustomerMoralComponent,
    BaseCustomerComponentComponent
  ],
  imports: [
    CommonModule,
    CustomerParentRoutingModule
  ]
})
export class CustomerParentModule { }

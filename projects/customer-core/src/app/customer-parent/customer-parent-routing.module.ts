import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMoralComponent } from './customer-moral/customer-moral.component';
import { CustomerPhysiqueComponent } from './customer-physique/customer-physique.component';
import { BaseCustomerComponentComponent } from './base-customer-component/base-customer-component.component';

const routes: Routes = [
  {
    path: 'customer-moral',
    component: CustomerMoralComponent
  },
  {
    path: '',
    component: BaseCustomerComponentComponent,
    pathMatch: 'full'
  },
  {
    path: 'customer-physique',
    component: CustomerPhysiqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerParentRoutingModule { }

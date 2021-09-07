import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMoralComponent } from './customer-moral/customer-moral.component';
import { CustomerPhysiqueComponent } from './customer-physique/customer-physique.component';
import { BaseCustomerComponentComponent } from './base-customer-component/base-customer-component.component';
import { environment } from '../../../../shared-lib/src/environments/environment.prod';
import { PhysicPersonListComponent } from './physic-person-list/physic-person-list.component';
import { DeceasedCustomerListComponent } from './deceased-customer-list/deceased-customer-list.component';
import { DeceasedCustomerViewComponent } from './deceased-customer-view/deceased-customer-view.component';
import { MoralPersonViewComponent } from './moral-person-view/moral-person-view.component';
import { PhysicalPersonViewComponent } from './physical-person-view/physical-person-view.component';
import { CustomerOppositionListComponent } from './customer-opposition-list/customer-opposition-list.component';
import { CustomerOppositionViewComponent } from './customer-opposition-view/customer-opposition-view.component';
import { MoralPersonListComponent } from './moral-person-list/moral-person-list.component';

let env = environment.routes;

const routes: Routes = [
  {
    path: 'customer-moral',
    component: CustomerMoralComponent
  },
  {
    path: '',
    component: PhysicPersonListComponent,
    data: { title: 'Clients', breadcrumb: env.physicalCustomerList.breadcumb },
    resolve: {
      /* physicPersonService: PhysicPersonResolver */
    },
    pathMatch: 'full'
  },
  {
    path: 'customer-physique',
    component: CustomerPhysiqueComponent
  },
  {
    path: env.physicalCustomerList.url,
    component: PhysicPersonListComponent,
    data: { title: 'Clients', breadcrumb: env.physicalCustomerList.breadcumb },
    resolve: {
      /* physicPersonService: PhysicPersonResolver */
    }
  },
  {
    path: env.moralCustomerList.url,
    component: MoralPersonListComponent,
    data: { title: 'Groups', breadcrumb: env.moralCustomerList.breadcumb },
    resolve: {
      /*  moralPersonService: MoralPersonResolver */
    }
  },
  {
    path: env.moralCustomer.url,
    component: MoralPersonViewComponent,
    data: { title: 'Clients', breadcrumb: env.moralCustomer.breadcumb },
    resolve: {
      /* physicPersonService: PhysicPersonResolver */
    }
  },
  {
    path: env.physicalCustomer.url,
    component: PhysicalPersonViewComponent,
    data: { title: 'Clients', breadcrumb: env.physicalCustomer.breadcumb },
    resolve: {
      /* physicPersonService: PhysicPersonResolver */
    }
  },
  {
    path: env.customerOpposition.url,
    component: CustomerOppositionListComponent,
    data: { Title: 'Morale', breadcrumb: env.customerOpposition.breadcumb },
    resolve: {
      /*   personMoralService: MoralPersonResolver */
    }
  },
  {
    path: env.customerOppositionView.url,
    component: CustomerOppositionViewComponent,
    data: { Title: 'Morale', breadcrumb: env.customerOppositionView.breadcumb },
    resolve: {
      /*  personMoralService: MoralPersonResolver */
    }
  },
  {
    path: env.physicalCustomer.url,
    component: PhysicalPersonViewComponent,
    data: { title: 'Clients', breadcrumb: env.physicalCustomer.breadcumb },
    resolve: {
      /*  personService: PhysicPersonResolver */
    }
  },
  {
    path: env.physicalCustomer.url,
    component: PhysicalPersonViewComponent,
    data: { title: 'Clients', breadcrumb: env.physicalCustomer.breadcumb },
    resolve: {
      /*  personService: PhysicPersonResolver */
    }
  },
  {
    path: env.moralCustomer.url,
    component: MoralPersonViewComponent,
    data: { title: 'Clients', breadcrumb: env.moralCustomer.breadcumb },
    resolve: {
      /* physicPersonService: PhysicPersonResolver */
    }
  },
  {
    path: env.physicalCustomer.url,
    component: PhysicalPersonViewComponent,
    data: { title: 'Clients', breadcrumb: env.physicalCustomer.breadcumb },
    resolve: {
      /* physicPersonService: PhysicPersonResolver */
    }
  },
  {
    path: env.customerOpposition.url,
    component: CustomerOppositionListComponent,
    data: { Title: 'Morale', breadcrumb: env.customerOpposition.breadcumb },
    resolve: {
      /* personMoralService: MoralPersonResolver */
    }
  },
  {
    path: env.customerOppositionView.url,
    component: CustomerOppositionViewComponent,
    data: { Title: 'Morale', breadcrumb: env.customerOppositionView.breadcumb },
    resolve: {
      /*  personMoralService: MoralPersonResolver */
    }
  },
  {
    path: env.physicalCustomer.url,
    component: PhysicalPersonViewComponent,
    data: { title: 'Clients', breadcrumb: env.physicalCustomer.breadcumb },
    resolve: {
      /* personService: PhysicPersonResolver */
    }
  },
  {
    path: env.physicalCustomer.url,
    component: PhysicalPersonViewComponent,
    data: { title: 'Clients', breadcrumb: env.physicalCustomer.breadcumb },
    resolve: {
      /* personService: PhysicPersonResolver */
    }
  },
  {
    path: env.deadCustomer.url,
    component: DeceasedCustomerListComponent,
    data: { Title: 'Client decede', breadcrumb: env.deadCustomer.breadcumb },
  },
  {
    path: env.deadCustomerView.url,
    component: DeceasedCustomerViewComponent,
    data: { Title: 'List clients decedes', breadcrumb: env.deadCustomerView.breadcumb },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerParentRoutingModule { }

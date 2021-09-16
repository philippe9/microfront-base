import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfigComponent } from './config/config.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
// import { CustomerParentRoutingModule } from '../../../customer-core/src/app/customer-parent/customer-parent-routing.module';
// import { AppComponent } from '../../../user-core/src/app/app.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'config',
    component: ConfigComponent
  },
  {
    path: 'customer',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost/dist_prod/customer-core/remoteEntry.js',
      // remoteEntry: 'http://localhost:3001/remoteEntry.js',
      remoteName: 'customerCore',
      exposedModule: './Module',
    })
      .then(m => m.CustomerModule)
  },
  {
    path: 'account',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost/dist_prod/account-core/remoteEntry.js',
      // remoteEntry: 'http://localhost:3002/remoteEntry.js',
      remoteName: 'accountCore',
      exposedModule: './Module',
    })
      .then(m => m.AccountParentModule)
  },
  {
    path: 'account-manager',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost/dist_prod/account-manager-core/remoteEntry.js',
      // remoteEntry: 'http://localhost:3003/remoteEntry.js',
      remoteName: 'accountManagerCore',
      exposedModule: './Module',
    })
      .then(m => m.AccountManagerParentModule)
  }

];

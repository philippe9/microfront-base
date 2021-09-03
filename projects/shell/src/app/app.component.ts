import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { buildRoutes } from '../menu-utils';
import { LookupService } from './microfrontends/lookup.service';
import { Microfrontend } from './microfrontends/microfrontend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  microfrontends: Microfrontend[] = [];
  items: MenuItem[];

  constructor(
    private router: Router,
    private lookupService: LookupService) {
  }

  async ngOnInit(): Promise<void> {
    this.microfrontends = await this.lookupService.lookup();
    const routes = buildRoutes(this.microfrontends);
    this.router.resetConfig(routes);
    this.items = [
      {
        label: 'Customer',
        items: [{
          label: 'Customer Base',
          items: [
            {
              label: 'Base',
              routerLink: '/customer',
            },
            {
              label: 'Personne Moral',
              routerLink: '/customer/customer-moral',
            },
            {
              label: 'Personne physique',
              routerLink: '/customer/customer-physique',
            },
          ]
        }
        ]
      }
    ];
  }


}


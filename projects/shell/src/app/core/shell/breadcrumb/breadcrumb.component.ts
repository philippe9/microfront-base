import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AbstractComponent } from 'projects/shared-lib/src/template/abstract/abstract.component';
import { Breadcrumb } from './breadcrumb.model';

/** Custom Model * /
 import { Breadcrumb } from './breadcrumb.model';

 /**
 * Route data property to generate breadcrumb using a static string.
 *
 * Example- breadcrumb: 'Home'
 */
const routeDataBreadcrumb = 'breadcrumb';
/**
 * Route data property to generate breadcrumb using given route parameter name.
 *
 * Example- routeParamBreadcrumb: 'id'
 */
const routeParamBreadcrumb = 'routeParamBreadcrumb';
/**
 * Route data property to generate breadcrumb using resolved data property name.
 *
 * Use array to specify name for a nested object property.
 *
 * Example- routeResolveBreadcrumb: ['user', 'username']
 */
const routeResolveBreadcrumb = 'routeResolveBreadcrumb';
/**
 * Route data property to specify whether generated breadcrumb should have a link.
 *
 * True by default. Specify false if a link is not required.
 *
 * Example- addBreadcrumbLink: false
 */
const routeAddBreadcrumbLink = 'addBreadcrumbLink';

@Component({
  selector: 'microfi-breadcrumb',
  template: `
  <nav class="breadcrumb-wrapper">
  <ul class="breadcrumb">
    <span class="breadcrumb-title">{{ breadcrumbs[breadcrumbs.length-1].label }}</span>
    <span *ngIf="breadcrumbs.length-1 !== 0" class="separator">
      <li *ngFor="let breadcrumb of breadcrumbs; let last = last" class="breadcrumb-label">
        <span *ngIf="!last" class="breadcrumb-link">
          <a *ngIf="breadcrumb.url" [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a>
          <span *ngIf="!breadcrumb.url">{{ breadcrumb.label }}</span>
        </span>
        <span *ngIf="last">{{ breadcrumb.label }}</span>
      </li>
    </span>
  </ul>
</nav>
  `,
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent extends AbstractComponent implements OnInit {

  /** Array of breadcrumbs. */
  breadcrumbs: Breadcrumb[];
  /**
   * Generates the breadcrumbs.
   * @param {ActivatedRoute} activatedRoute Activated Route.
   * @param {Router} router Router for navigation.
   */
  constructor(injector: Injector) {
    super(injector);
    this.generateBreadcrumbs();
  }

  ngOnInit() {

  }

  /**
   * Generates the array of breadcrumbs for the visited route.
   */
  generateBreadcrumbs() {
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    onNavigationEnd.subscribe(() => {
      this.breadcrumbs = [];
      let currentRoute = this.activatedRoute.root;
      let currentUrl = '';

      while (currentRoute.children.length > 0) {
        const childrenRoutes = currentRoute.children;
        let breadcrumbLabel: any;
        let url: any;

        childrenRoutes.forEach(route => {
          currentRoute = route;
          breadcrumbLabel = false;

          if (route.outlet !== 'primary') {
            return;
          }

          const routeURL = route.snapshot.url.map(segment => segment.path).join('/');
          currentUrl += `/${routeURL}`;

          if (currentUrl === '/') {
            breadcrumbLabel = 'Home';
          }

          const hasData = (route.routeConfig && route.routeConfig.data);

          if (hasData) {
            if (route.snapshot.data.hasOwnProperty(routeResolveBreadcrumb) && route.snapshot.data[routeResolveBreadcrumb]) {
              breadcrumbLabel = route.snapshot.data;
              route.snapshot.data[routeResolveBreadcrumb].forEach((property: any) => {
                breadcrumbLabel = breadcrumbLabel[property];
              });
            } else if (route.snapshot.data.hasOwnProperty(routeParamBreadcrumb) && route.snapshot.paramMap.get(route.snapshot.data[routeParamBreadcrumb])) {
              breadcrumbLabel = route.snapshot.paramMap.get(route.snapshot.data[routeParamBreadcrumb]);
            } else if (route.snapshot.data.hasOwnProperty(routeDataBreadcrumb)) {
              breadcrumbLabel = route.snapshot.data[routeDataBreadcrumb];
            }

            if (route.snapshot.data.hasOwnProperty(routeAddBreadcrumbLink)) {
              url = route.snapshot.data[routeAddBreadcrumbLink];
            } else {
              url = currentUrl;
            }
          }

          const breadcrumb: Breadcrumb = {
            label: breadcrumbLabel,
            url: url
          };

          if (breadcrumbLabel) {
            this.breadcrumbs.push(breadcrumb);
          }
        });
      }
    });
  }

}

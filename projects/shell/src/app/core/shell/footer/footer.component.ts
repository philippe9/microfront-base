import { Component, OnInit } from '@angular/core';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';

@Component({
  selector: 'microfi-footer',
  template: `
    <!-- <div fxLayout="column" id="footer" class="m-b-20">
      <mat-divider fxFlexAlign="center" class="divider"></mat-divider>
      <p fxFlexAlign="center" class="footer-content">Version {{ version }}</p>
      <p fxFlexAlign="center" class="footer-content">Granite X is up to date</p>
    </div> -->
    <div class="w-100 text-center"><small class="mr-2">Version {{ version }}</small><small>Granite X is up to date</small><div>
  `,
  styles: [`
    #footer {
      .divider {
        margin: 2.5rem 1rem 0.5rem;
        width: 4rem;
      }

      .footer-content {
        margin: 0;
      }
    }
  `]
})
export class FooterComponent implements OnInit {

  version: string = environment.version;

  constructor() {
  }

  ngOnInit() {
  }

}

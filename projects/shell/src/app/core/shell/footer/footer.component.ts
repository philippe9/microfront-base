import { Component, OnInit } from '@angular/core';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { AuthenticationService } from 'projects/shared-lib/src/public-api';

@Component({
  selector: 'microfi-footer',
  template: `
    <div class="divider mb-4"> </div>
    <div class="row" style="font-size:10px;">
        <div class="col-md-6 col-sm-6 col-xs-6">
            <div class="pull-left">
               <p><i class="fa fa-copyright"></i> RC &nbsp; {{version}}</p>
            </div>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-6">
            <div class="pull-right mr-4 d-flex policy">
                <div>Terms of Use</div>
                <div>Privacy Policy</div>
                <div>Cookie Policy</div>
            </div>
        </div>
    </div>
  `,
  styles: [`
    .divider {
          border-top: 2px solid rgba(189, 196, 203, 0.5);
      }
  `]
})
export class FooterComponent implements OnInit {

  version: string = environment.version;
  localRoutes = environment.routes;
  constructor(public authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.getProfilsAndHabilitations().subscribe((data) => {
      console.log(data);
      localStorage.setItem('microfiXLoggedUser', JSON.stringify(data));
    })

  }

}

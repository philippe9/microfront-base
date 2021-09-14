import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Logger } from 'projects/shared-lib/src/service/logger/logger.service';
import { ApiService } from 'projects/shared-lib/src/template/api.service';

const log = new Logger('Microfi');

@Injectable({
  providedIn: 'root'
})
export class AccountHistoryResolver extends ApiService implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.findCompte("/compte/page", route.queryParams.numero, route.queryParams.cle);
  }
}

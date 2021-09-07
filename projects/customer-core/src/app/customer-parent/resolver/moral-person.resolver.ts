import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {MoralPersonService} from '../service/moral-person.service';

@Injectable({
  providedIn: 'root'
})
export class MoralPersonResolver implements Resolve<Object> {
  constructor(private moralPersonService: MoralPersonService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.moralPersonService.getMoralePersonsList();
  }
}

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHash, SearchParam } from 'projects/shared-lib/src/domain/SearchParam';
import { ApiService } from 'projects/shared-lib/src/template/api.service';
import { BaseRecords } from 'projects/shared-lib/src/template/base-records';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccountManagerResolver implements Resolve<BaseRecords<any>> {

  searchCriteria: SearchParam;
  constructor(
    private router: Router,
    private api: ApiService
  ) { }



  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.searchCriteria = new SearchParam;
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    equal["code"] = route.params.id;
    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    return this.api.post(environment.api.accountManagerPage, this.searchCriteria)
      .pipe(catchError((err) => this.router.navigateByUrl('/')
      ));
  }
}

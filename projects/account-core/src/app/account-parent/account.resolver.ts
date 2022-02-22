import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { IHash, SearchParam } from 'projects/shared-lib/src/domain/SearchParam';
import { ApiService } from 'projects/shared-lib/src/template/api.service';
import { BaseRecords } from 'projects/shared-lib/src/template/base-records';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../shared-lib/src/environments/environment.prod';
// import { IHash, SearchParam } from 'src/app/domain/SearchParam';
// import { ApiService } from 'src/app/template/api.service';
// import { BaseRecords } from 'src/app/template/base-records';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccountResolver implements Resolve<BaseRecords<any>> {

  searchCriteria: SearchParam;
  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    this.searchCriteria = new SearchParam;
    equal["numeroCompte"] = route.params['num'];
    equal["cleCompte"] = route.params['cle'];
    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    return this.api.post(environment.api.accountPage, this.searchCriteria)
      .pipe(catchError((err) => this.router.navigateByUrl('/')
      ));
  }
}

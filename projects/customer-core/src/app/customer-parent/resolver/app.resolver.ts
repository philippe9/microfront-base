import { Injectable, Injector } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { PhysicalPerson } from 'projects/shared-lib/src/domain/PhysicalPerson';
import { Observable, of } from 'rxjs';
// import {PhysicalPerson} from 'src/app/domain/PhysicalPerson';
import { PhysicPersonService } from '../service/physic-person.service';
import { ViewComponent } from '../../../../../shared-lib/src/template/view/view.component';

@Injectable({
  providedIn: 'root'
})
export class AppResolver extends ViewComponent implements Resolve<any> {
  constructor(injector: Injector) {
    super(injector);
  }

  resolve(route: ActivatedRouteSnapshot): any {
    // console.log(route);
    // this.sendAuditMessage(route.)
  }
}

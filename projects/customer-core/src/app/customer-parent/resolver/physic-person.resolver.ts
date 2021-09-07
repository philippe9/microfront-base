import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { PhysicalPerson } from 'projects/shared-lib/src/domain/PhysicalPerson';
import { Observable, of } from 'rxjs';
// import {PhysicalPerson} from 'src/app/domain/PhysicalPerson';
import { PhysicPersonService } from '../service/physic-person.service';

@Injectable({
  providedIn: 'root'
})
export class PhysicPersonResolver implements Resolve<any> {
  constructor(private physicPersonService: PhysicPersonService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PhysicalPerson[]> | any {
    return this.physicPersonService.getPhysicalPersons();
  }
}

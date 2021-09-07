import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { MatStepper } from '@angular/material/stepper';
import { Person } from '../../../../../shared-lib/src/domain/person';
import { PhysicalPerson } from '../../../../../shared-lib/src/domain/PhysicalPerson';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { MoralPerson } from '../../../../../shared-lib/src/domain/MoralPerson';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  person: Person;

  constructor(private http: HttpClient) {
  }

  getFilteredPhysicalPerson(orderBy: string, sortOrder: string, orphansOnly: boolean, displayName: string, officeId?: any): Observable<PhysicalPerson> | any {

  }

  getPhysicalPerson(orderBy: string, sortOrder: string, offset: number, limit: number): Observable<any> {
    const httpParams = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString())
      .set('sortOrder', sortOrder)
      .set('orderBy', orderBy);
    return this.http.get(`${environment.api.physicalCustomerList}`, { params: httpParams });
  }

  getPhysicalPersons(): Observable<PhysicalPerson> | any {
    return [];
    return this.http.get(`${environment.api.physicalCustomerList}`);
  }

  getMoralePersonsList(): Observable<MoralPerson> | any {
    return [];
    return this.http.get(`${environment.api.moralCustomerList}`)
  }

  postMoralCustomer(data: any): Observable<any> {
    return this.http.post<MoralPerson>(environment.api.moralCustomerPost, data);
  }

  postPhysicCustomer(data: any): Observable<any> {
    return this.http.post<PhysicalPerson>(environment.api.physicCustomerPost, data);
  }

  getGestionnaire(): Observable<any> {
    return this.http.get(environment.api.gestionnaireList + environment.idUniteBancaire);

  }

  getFamilleClient(): Observable<any> {
    return this.http.get(environment.api.familleClientList + environment.idUniteBancaire);

  }

  getGroupeClient(): Observable<any> {
    return this.http.get(environment.api.groupeClientList + environment.idUniteBancaire);
  }

  findPerson(data: any): Observable<any> {
    return this.http.post<any>(environment.api.findPersonne, data);
  }

  createPerson(data: any): Observable<any> {
    return this.http.post<any>(environment.api.createPersonne, data);
  }


}

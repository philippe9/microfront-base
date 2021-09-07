import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Person } from '../../../../../shared-lib/src/domain/person';
import { PhysicalPerson } from '../../../../../shared-lib/src/domain/PhysicalPerson';

@Injectable({
  providedIn: 'root'
})
export class PhysicPersonService {
  person: Person;

  constructor(private http: HttpClient) {
  }

  getFilteredPhysicalPerson(
    orderBy: string, sortOrder: string,
    orphansOnly: boolean, displayName: string,
    officeId?: any): Observable<PhysicalPerson[]> | any {

  }

  getPhysicalPerson(orderBy: string, sortOrder: string, offset: number, limit: number): Observable<PhysicalPerson[]> | any {
    const httpParams = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString())
      .set('sortOrder', sortOrder)
      .set('orderBy', orderBy);
    return this.http.get(`${environment.api.physicalCustomerList}`, { params: httpParams });
  }

  getPhysicalPersons(): Observable<PhysicalPerson[]> | any {
    return this.http.get(`${environment.api.physicalCustomerList}`);
  }

  postPhysicCustomer(data: any): Observable<any> {
    return this.http.post<PhysicalPerson>(environment.api.physicCustomerPost, data);
  }
}

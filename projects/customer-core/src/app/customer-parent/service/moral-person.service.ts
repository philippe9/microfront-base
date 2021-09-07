import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { Observable } from 'rxjs';
import { MoralPerson } from '../../../../../shared-lib/src/domain/MoralPerson';

@Injectable({
  providedIn: 'root'
})
export class MoralPersonService {

  constructor(private http: HttpClient) {
  }

  getMoralePersonsList(): Observable<MoralPerson> | any {
    return [];
    return this.http.get(`${environment.api.moralCustomerList}`)
  }

  postMoralCustomer(data: any): Observable<any> {
    return this.http.post<MoralPerson>(environment.api.moralCustomerPost, data);
  }
}

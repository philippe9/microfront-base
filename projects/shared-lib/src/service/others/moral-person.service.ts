import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoralPerson } from '../../domain/MoralPerson';
import { environment } from '../../environments/environment.prod';

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

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Branch } from '../../domain/Branch';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor(private http: HttpClient) {
  }

  doGetBranches(): Observable<Branch[]> | any {
    return this.http.get(`${environment.baseApiUrl}${environment.apiProvider}${environment.apiVersion}${environment.api.agenceList}`).pipe(
      tap(data => {
        return (<any>data).returnValue;
      })
    );
  }

  findAll(base: string): Observable<any> {
    base = base + "/all";
    return this.http.get(`${base}`)
  }

  findByPage(base: String, data: any): Observable<any> {
    base = base + "/page";
    return this.http.post(`${base}`, data);
  }

  /**
   * @param {any} group Group to be updated.
   * @param {any} groupId Group Id
   * @returns {Observable<any>}
   */
  updateGroup(base: string, objectId: any, data: any): Observable<any> {
    return this.http.put(`/${base}/${objectId}`, data);
  }

}

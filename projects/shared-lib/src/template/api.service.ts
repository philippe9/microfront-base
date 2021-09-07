import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseRecord } from './base-record';
import { BaseRecords } from './base-records';
import { SearchParam } from '../domain/SearchParam';
import { Logger } from '../service/logger/logger.service';

const log = new Logger('Microfi');

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }
  response: any;

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string): Observable<any> {
    console.log("environment.baseApiUrl", `${path}`)
    return this.http.get(`${path}`)
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    console.log("environment.baseApiUrl", `${path}`)
    return this.http.put(
      `${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    console.log("environment.baseApiUrl", `${path}`)
    console.log("environment.Object", Object)
    return this.http.post(
      `${path}`,
      JSON.stringify(body), httpOptions
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.baseApiUrl}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  /**
   *
   * @param {string} base path of the entity's web service
   * @param {HttpParams} params
   * @returns {Observable<any>}
   */
  findById(base: string, id: any, params: HttpParams = new HttpParams()): Observable<BaseRecord<any>> {
    base = base + "/" + id;
    return this.http.get(`${base}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  /**
   *
   * @param {string} base path of the entity's web service
   * @param {Object} body
   * @returns {Observable<any>}
   */
  create(base: string, body: Object = {}): Observable<BaseRecord<any>> {
    //update this depending on backend
    base = base + "";
    return this.post(base, body);
  }
  /**
   * update method that matches the one of the generic web services
   *
   * @param {string} base path of the entity's web service
   * @param {Object} body
   * @returns {Observable<any>}
   */
  update(base: string, body: Object = {}): Observable<BaseRecord<any>> {
    return this.put(base, body);
  }

  /**
   * Delete resource by id
   * @param base
   * @param id
   * @returns {Observable<any>}
   */
  deleteResource(base, id): Observable<BaseRecord<any>> {
    base = base + "/" + id;
    return this.delete(base);
  }

  /**
   *
   * @param {string} base path of the entity's web service
   * @returns {Observable<any>}
   */
  findAll(base: string): Observable<BaseRecords<any>> {
    base = base + "/all";
    return this.get(base);
  }

  findCompte(base: string, numero: string, cle: string): any {
    let searchCriteria = new SearchParam;
    searchCriteria.first = 0;
    searchCriteria.max = -1;
    let equal = {};
    equal["numeroCompte"] = numero;
    equal["cleCompte"] = cle;
    searchCriteria.equal = equal;
    log.info(searchCriteria);
    return this.post(base, searchCriteria).pipe(
      tap(data => {
        return (<any>data).returnValue;
      })
    );
  }

  public download(fileName: string): Observable<any> {
    return this.http.get(`${fileName}`, { responseType: 'blob' });
  }

  public getHttp(): HttpClient {
    return this.http;
  }

  public getParametreCollecte(): any {
    this.http.get(environment.api.collecteJourParams).subscribe(
      (response) => {
        this.response = response;
      },
      (error) => {
        console.log(error);
      }
    );
    return this.response;

  }





}

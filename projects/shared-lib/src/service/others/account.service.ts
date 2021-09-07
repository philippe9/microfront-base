import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";
// import { MiseEnPlaceReservationDTO } from 'src/app/domain/MiseEnPlaceReservationDTO';
// import { DtoForLeveeReservation } from 'src/app/domain/DtoForLeveeReservation';
import { OppositionCompteDTO } from '../../domain/OppositionCompteDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  findPositionCompte(data: any): Observable<any> {
    return this.http.post<any>(environment.api.accountPage, data);
  }

  findHistoryPositionAccount(data: any): Observable<any> {
    return this.http.post<any>(environment.api.accountPositionHistory, data);
  }

  findHistory(data: any): Observable<any> {
    return this.http.post<any>(environment.api.accountHistory, data);
  }

  miseEnplaceReservation(data: any): Observable<any> {
    return this.http.post<any>(environment.api.miseEnPlaceReservation, data);
  }

  leveeReservation(data: any): Observable<any> {
    return this.http.post<any>(environment.api.leveeReservation, data);
  }

  miseEnPlaceOppositionCompte(data: OppositionCompteDTO): Observable<any> {
    return this.http.post<any>(environment.api.miseEnPlaceOppositionCompte, data);
  }

  leveeOppositionCompte(data: OppositionCompteDTO): Observable<any> {
    return this.http.post<any>(environment.api.leveeOppositionCompte, data);
  }

}

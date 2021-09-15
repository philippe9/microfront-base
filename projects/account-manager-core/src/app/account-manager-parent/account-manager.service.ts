import { GestionnaireAutorise } from 'projects/shared-lib/src/domain/GestionnaireAutorise';
import { AccountManager } from 'projects/shared-lib/src/domain/AccountManager';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { GestionnaireDto } from 'projects/shared-lib/src/app/domain/GestionnaireDto';

export class SearchGestionnaire {
  codeGestionnaire: string;
  codeUniteBancaire: string;
  nom: string;

  constructor(codeGestionnaire: string, codeUniteBancaire: string, nom: string) {
    this.codeGestionnaire = codeGestionnaire;
    this.codeUniteBancaire = codeUniteBancaire;
    this.nom = nom;
  }
}

/**
 * Accounting service.
 */
@Injectable({
  providedIn: 'root'
})
export class AccountManagerService {
  urlAccountManagerList = environment.api.accountManagerList;
  urlAccountManagerCreate = environment.api.accountManagerCreate;
  urlAccountManagerDelete = environment.api.accountManagerDelete;
  urlAccountManagerModify = environment.api.accountManagerModify;
  gestionnaireDetails: AccountManager;
  gestionnaireAutorise: GestionnaireAutorise[];
  gestionnaireAutoriseTotal: any[];

  constructor(private http: HttpClient) {
  }


  listAccountManager(codeGestionnaire: string, codeUniteBancaire: string, nom: string): Observable<any> {
    let gestionnaire = new SearchGestionnaire(codeGestionnaire, codeUniteBancaire, nom);
    return this.http.post(this.urlAccountManagerList, gestionnaire);
  }

  listAccountManagerAutorise(): Observable<any> {
    let gestionnaire = new SearchGestionnaire(null, "00001", null);
    return this.http.post(this.urlAccountManagerList, gestionnaire);
  }

  createAccountManager(gestionnaire: AccountManager): Observable<any> {
    return this.http.post(this.urlAccountManagerCreate, gestionnaire);
  }

  modifyAccountManager(gestionnaire: AccountManager): Observable<any> {
    return this.http.post(this.urlAccountManagerCreate, gestionnaire);
  }


  deleteAccountManager(gestionnaire: AccountManager): Observable<any> {
    return this.http.post(this.urlAccountManagerDelete, gestionnaire);
  }

}

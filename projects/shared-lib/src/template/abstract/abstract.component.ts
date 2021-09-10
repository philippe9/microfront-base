import { UtilisateurDTO } from '../../service/authentication/credentials.model';
import { Component, Injector, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from '../../domain/dialog.enum';
import { RequestType } from '../../domain/request-type.enum';
import { IHash, SearchParam } from '../../domain/SearchParam';
import { AccountService } from '../../service/others/account.service';
import { CustomerService } from '../../service/others/customer.service';
import { AlertService } from '../../service/alert/alert.service';
//import { UtilisateurDTO } from '../../service/authentication/credentials.model';
import { AutoService } from '../../service/auto.service';
import { GeneralService } from '../../service/general/general.service';
import { Logger } from '../../service/logger/logger.service';
import { SettingService } from '../../service/setting/setting.service';
import { environment as environments } from '../../environments/environment.prod';
import { ApiService } from '../api.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

const log = new Logger('AbstractComponent');

@Component({
  selector: 'abstract',
  template: '',
  providers: [AutoService,]
})
export class AbstractComponent implements OnInit {

  isCreate = false;
  isEdit = false;
  isView = false;
  isValidation = false;
  base: string;
  searchUrl: string;
  urlUniteBancaireList: string = this.environment.api.uniteBancaireList;
  urlAgenceList: string = this.environment.api.agenceList;
  mode: any;
  private credentialsStorageKey = 'microfiXCredentials';
  _currentUser: UtilisateurDTO;
  creation = Dialog.CREATION;
  edit = Dialog.MODIFICATION;
  delete = Dialog.DELETE;
  requestType: RequestType;
  searchCriteria: SearchParam;
  public displayedColumns: string[];
  public dataSource: any;
  public uniteLibelle = "Unite";
  public agenceLibelle = "Agence";
  public deviseLibelle = "Devise";
  public clientLibelle = "Client";
  public selectedItemsLabel = "Nombre d'items recupere";
  alias: IHash = {};
  like: IHash = {};
  equal: IHash = {};
  env: any;
  public firstIndex: number = 0;
  public itemsPerPage: number = 15;
  public itemsPerPageNavigate: number = 10;
  public totalItems: number = 15;
  public model: any;
  public dateFormat = "dd/mm/yyyy";
  _dateComptable: Date;
  audit_subject = new BehaviorSubject<any>('Initiation de l\'audit');

  constructor(@Optional() public injector: Injector) {
    this.env = environments.routes;
    // console.log(injector);
  }

  ngOnInit(): void {
    log.info(this.base);
    this.activatedRoute.data.subscribe(data => {
      this.initMode(data.mode);
    });
    this.audit_subject.subscribe({
      next: (v) => {
        this.logger.info(v);
        console.log(v);
        localStorage.setItem('audit_storage', localStorage.getItem('audit_storage') + v + '/n');
      }
    });
  }

  builSearchCriterias(searchCriteria: SearchParam = {}) {
    this.searchCriteria = searchCriteria;
  }

  search() {
    this.apiService.post(this.searchUrl, this.searchCriteria)
      .subscribe((data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>((data as any).returnValue);
        this.totalItems = (data as any).nbPages;
      });
  }

  find<T>(tableModel: T) {
    this.searchCriteria.first = this.firstIndex;
    this.searchCriteria.max = this.itemsPerPage;
    this.apiService.post(this.searchUrl, this.searchCriteria)
      .subscribe((data) => {
        if (tableModel !== null && tableModel !== undefined) {
          this.dataSource = new MatTableDataSource<typeof tableModel>((data as any).returnValue);
        } else {
          this.dataSource = new MatTableDataSource<any>((data as any).returnValue);
        }
        this.totalItems = (data as any).nbPages;
        if (this.totalItems <= 1 && (!data.returnValue || !data.returnValue.length)) {
          this.openInfo(data.returnMsg + " - " + " Aucun resultat trouvé");
        }
      },
        error => this.openError(error.status + " - " + error.statusText));
  }

  onPaginate(pageEvent: PageEvent) {
    if (pageEvent.previousPageIndex !== pageEvent.pageIndex) {
      return;
    }
    this.logger.info(pageEvent);
    this.searchCriteria.first = pageEvent.pageIndex * pageEvent.pageSize;
    this.searchCriteria.max = this.searchCriteria.first + pageEvent.pageSize;
    this.logger.info(this.searchCriteria);
    this.apiService.post(this.searchUrl, this.searchCriteria)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<any>((data as any).returnValue);
        this.totalItems = (data as any).nbPages;
      });
  }
  findOne(id: string): any {
    this.searchCriteria = new SearchParam;
    this.searchCriteria.equal["id"] = id;
    return this.apiService.post(this.searchUrl, this.searchCriteria)
      .subscribe((data) => (data as any).returnValue);
  }

  initMode(mode: Dialog) {
    if (mode) {
      this.mode = mode;
      this.isCreate = mode === Dialog.CREATION;
      this.isEdit = mode === Dialog.MODIFICATION;
      this.isView = mode === Dialog.CONSULTATION;
      this.isValidation = mode === Dialog.VALIDATION;
    }
  }

  public get environment(): any {
    return environments;
  }

  public get settingsService(): SettingService {
    return this.injector.get(SettingService);
  }

  public get generalService(): GeneralService {
    return this.injector.get(GeneralService);
  }

  public get activatedRoute(): ActivatedRoute {
    return this.injector.get(ActivatedRoute);
  }

  public get alertService(): AlertService {
    return this.injector.get(AlertService);
  }

  public get router(): Router {
    return this.injector.get(Router);
  }

  public get formGroupBuilder(): FormBuilder {
    return this.injector.get(FormBuilder);
  }

  public get dialog(): MatDialog {
    return this.injector.get(MatDialog);
  }

  public get customerService(): CustomerService {
    return this.injector.get(CustomerService);
  }

  public get accountService(): AccountService {
    return this.injector.get(AccountService);
  }

  public get apiService(): ApiService {
    return this.injector.get(ApiService);
  }


  public get logger(): Logger {
    return log;
  }

  public get currentUser(): UtilisateurDTO {
    let currentUser = JSON.parse(
      sessionStorage.getItem(this.credentialsStorageKey) || localStorage.getItem(this.credentialsStorageKey)
    );
    // this.logger.info(currentUser.object);
    return {
      profil: null,
      niveauForcage: "string",
      code: "string",
      nom: "string",
      login: "string",
      defaultPassword: "string",
      niveau: "string",
      codeGroupe: "string",
      codeFiliale: "string",
      codeSuccursale: "string",
      codeBranche: "string",
      multiUnite: "string",
      listeObjet: "string",
      suspendu: "string",
      dteFinSuspension: "string",
      dteModPasse: "string",
      langue: "string",
      maxConnect: "string",
      tentative: "string",
      tentativeOTP: "string",
      temporaire: "string",
      tempDteDebut: "string",
      tempDteFin: "string",
      dateValidite: "string",
      root: "string",
      champLibre1: "string",
      champLibre2: "string",
      champLibre3: "string",
      telephone: "string",
      mail: "string",
      sessionDTOs: [],
      profils: []
    };//this._currentUser = currentUser.object;
  }

  public set currentUser(current: UtilisateurDTO) {
    this._currentUser = current;
  }

  public setCurrentUser(current: UtilisateurDTO) {
    this._currentUser = current;
  }

  public get dateComptable(): Date {
    this._dateComptable = new Date();
    return this._dateComptable;
  }

  public set dateComptable(dateComptable: Date) {
    this._dateComptable = dateComptable;
  }

  /**
     * Open Error Dialog.
     * @param version version Id.
     */
  openError(data: any) {
    const openErrorLogDialog = this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: data
    });
    openErrorLogDialog.afterClosed().subscribe((response: any) => {

    });
  }

  /**
     * Open Info Dialog.
     * @param version version Id.
     */
  openInfo(data: any) {
    const openErrorLogDialog = this.dialog.open(CloseDialogComponent, {
      width: '400px',
      data: data
    });
    openErrorLogDialog.afterClosed().subscribe((response: any) => {

    });
  }

  /**
    * Open confirm Dialog.
    * @param version version Id.
    */
  confirmationDialog(info: { heading: string, message: string, type: string }): Promise<boolean> {
    // let choice: boolean = false;
    const confimDialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        data:
        {
          heading: info.heading,
          dialogContext: info.message,
          type: info.type
        }
      });
    return confimDialogRef.afterClosed().toPromise();
  }
  sendAuditMessage(message: any) {
    this.audit_subject.next(message);
  }

  clearMessage() {
    this.audit_subject.next('');
  }

  getAuditMessages(): Observable<any> {
    return this.audit_subject.asObservable();
  }
}

import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { ITest, MustMatch } from '../../template/validators/validators';
import { Dialog } from '../../domain/dialog';
import { environment } from '../../environments/environment.prod';
import { AbstractComponent } from '../abstract/abstract.component';
import { AlerteDialogComponent } from '../alerte-dialog/alerte-dialog.component';
import { BaseRecord } from '../base-record';


@Component({
  selector: 'microfi-view',
  template: ''
})
export class ViewComponent extends AbstractComponent {

  record: any;
  record1: any = {};
  record2: any;
  isSavingRecord = false;
  isCreateMode = false;
  isEditMode = false;
  isViewMode = false;
  isValidation = false;
  modalHide = false;
  urlResolver = "/home";
  selectedItemOnTables: any = { referencePiece: '', code: '', refImprime: '', id: 0, numeroDossier: '', numero: 0, dossier: {}, numeroSouscription: '', idClient: '', numeroCompte: '' };
  doGetCaisse = environment.api.doGetCaisse;
  doisChequeBanque = environment.api.doisChequeBanque;
  doisChequeOpposition = environment.api.doisChequeOpposition;
  doisChequeBanqueEmis = environment.api.doisChequeBanqueEmis;
  // doCaissePage = environment.api.doCaissePage;
  @Output() recordUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() recordCreated: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.mode = data.mode != null ? data.mode : Dialog.CREATION;
      this.initRecord();
    })
    super.ngOnInit();
    this.initData();

  }

  initRecord() {
    if (this.mode != 1) {
      this.getRecordFromRouteData();
    } else {
      this.record = {};
    }
  }

  protected getRecordFromRouteData() {
    this.activatedRoute.data.subscribe(
      data => {
        this.record = data.Response.returnValue[0];
        if (data.Response.returnValue == {}) {
          this.record = {};
          this.onOpenNullRecord(data.Response);
        } else {
          this.onRecordLoadedFromRouteData();
        }
      }
    );
  }

  onRecordLoadedFromRouteData() { }

  initData() { }

  onOpenNullRecord(response: BaseRecord<any>) {
    this.openError(response.returnMsg);
  }

  save() {
    if (this.record.id != null) {
      this.update();
    } else {
      this.create();
    }
  }

  protected update() {
    this.isSavingRecord = true;
    this.apiService.update(this.base, this.record).subscribe(
      response => {
        this.isSavingRecord = false;
        if (response.success) {
          this.router.navigateByUrl(this.urlResolver)
          // this.confirmationDialog(response.returnMsg)
          this.alerteDialog(response.returnMsg);
        } else {
          this.openError(response.returnMsg)
        }
      }, error => {
        this.isSavingRecord = false;
        this.openError(error.message)
      }
    )
  }
  protected create() {
    this.isSavingRecord = true;
    this.apiService.create(this.base, this.record).subscribe(
      response => {
        console.log("create res", response)
        if (response.success) {
          // this.router.navigateByUrl(this.urlResolver)
          this.alerteDialog(response.returnMsg)
        } else {
          this.openError(response.returnMsg)
        }
      }, error => {
        this.isSavingRecord = false;
        this.openError(error.message)
        // this.openError(error.message)
      }
    )
  }

  typeIdentites: any[] = []
  public getTypePiece() {
    let url: string = this.environment.api.urlTypePiece;
    this.apiService.post(url, {}).subscribe(
      response => {
        console.log("response type", response)
        if (response.success) {
          this.typeIdentites = response.returnValue;
          console.log("response type", response)
        }
      }, error => {
        this.isSavingRecord = false;
        this.openError(error.message)
        // this.openError(error.message)
      }
    )
  }

  alerteDialog(message: string): void {
    const dialogRef = this.dialog.open(AlerteDialogComponent, {
      width: '250px',
      data: message,
    });

    dialogRef.afterClosed().subscribe(result => {
      return result;
    });
  }

  caisse: string;
  devise: string;
  getConnectedUserCaisse() {
    this.isSavingRecord = true;
    this.apiService.get(this.doGetCaisse + "/COLLINS").subscribe(
      response => {
        console.log("opencaoise", this.record.caisse)
        if (response.success) {
          this.record1.caisse = response.returnValue;
          this.record1.devise = this.record1.caisse.deviseUnite
          this.caisse = this.record1.caisse.code;
          this.devise = this.record1.caisse.deviseUnite.code;
          console.log("opencaoise", this.record1.caisse)
        } else {
          this.openError(response.returnMsg)
        }
      }, error => {
        this.isSavingRecord = false;
        this.openError(error.message)
        // this.openError(error.message)
      }
    )
  }
  async checkChequeBanqueGlobal(unite: string, numero: string) {
    let response = null;
    try {
      response = await this.apiService.get(this.doisChequeBanque + "/" + unite + "/" + numero).toPromise();
      console.log("the console", response)
      if (response.success && response.returnValue) {
        return true;
      } else if (response.success) {
        return false;
      } else {
        this.alerteDialog("Le cheque n'est pas un cheque banque")
        return false;
      }

    } catch (error) {
      console.log("the error", error);
      this.alerteDialog("Le cheque n'est pas un cheque banque")
      return false;
    }
  }

  async checkOppositionChequeGlobal(unite: string, numero: string) {
    let response = null;
    try {
      response = await this.apiService.get(this.doisChequeOpposition + "/" + unite + "/" + numero).toPromise();
      console.log("the console", response)
      if (response.success && response.returnValue) {
        this.alerteDialog("Le cheque est en opposition")
        return true;
      } else if (response.success) {
        return false
      }
    } catch (error) {
      console.log("the error", error);
      this.alerteDialog("Le cheque est en opposition")
      return true;
    }
  }
  async checkChequeEmisGlobal(unite: string, numero: string) {
    let response = null;
    try {
      response = await this.apiService.get(this.doisChequeBanqueEmis + "/" + unite + "/" + numero).toPromise();

      console.log("the console", response)
      if (response.success && response.returnValue) {
        this.alerteDialog("Le cheque est emis")
        return true;
      } else if (response.success) {
        return false
      }

    } catch (error) {
      console.log("the error", error);
      this.alerteDialog("Le cheque est emis")
      return false;
    }

  }
  dateFormatter(date) {
    date = new Date(date);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('-');
  }
  selectedItemFromTable(item: any) {
    console.log(item);
    this.selectedItemOnTables = item;
  }

  // validateFields(data, fields: ITest[]):boolean {
  //   return this.MustMatchRecord(data, fields);
  // }

  validateForm(data, fields: ITest[]) {
    MustMatch(data, fields)();
    if (data.errors) {
      this.openInfo(data.errors.toString());
      return false;
    } else {
      return true;
    }
  }


  validateFields(data, fields: ITest[]) {
    MustMatch(data, fields)();
    if (data.errors) {
      this.openInfo(data.errors.toString());
      return false;
    } else {
      return true;
    }
  }

  // MustMatchRecord(form?: any, controlFields?: ITest[]): boolean {
  //   console.log("controlFields",controlFields)
  //       if (controlFields) { // to use in the controller
  //           console.log("field",controlFields)
  //           controlFields.forEach(controlName => {
  //                  let field =  controlName.field;
  //               if(form?.[field] ==undefined || form?.[field] ==null) {
  //                   console.log("!undefined")
  //                   if(controlName.msg){
  //                       this.openInfo(controlName.msg);
  //                       return false
  //                   }else{
  //                       this.openInfo(controlName.field + " "+ "is empty");
  //                       return false
  //                   }
  //               }
  //           });
  //       }
  //       return true;
  //   }

}





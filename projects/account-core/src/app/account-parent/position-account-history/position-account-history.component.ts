import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FindHistoParam } from 'projects/shared-lib/src/domain/FindHistoParam';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { ConsultationLotsComponent } from '../consultation-lots/consultation-lots.component';

@Component({
  selector: 'microfi-position-account-history',
  templateUrl: './position-account-history.component.html',
  styleUrls: ['./position-account-history.component.scss']
})
export class PositionAccountHistoryComponent extends ViewComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  param: FindHistoParam;
  searchDetails: FormGroup;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  soldeOuverture: string;
  cumulDebit: string;
  cumulCredit: string;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlTypeCompteList = environment.api.typeCompteList + environment.idUniteBancaire;
  urlTypeOperationList = environment.api.typeOperationList + '/' + environment.idUniteBancaire;
  urlDeviseList = environment.api.deviseList;
  DisableClient = false;
  labelClient = "Compte";
  initialAccount = null;
  constructor(injector: Injector) {
    super(injector);

    this.searchDetails = this.formGroupBuilder.group({
      devise: [],
      numeroCompte: [],
      cleCompte: [''],
      intituleCompte: [''],
      intituleClient: [''],
      compte: [],
      typeOperation: [],
      sens: [''],
      dateDebut: [null],
      dateFin: [null],
      montantMin: [''],
      montantMax: [''],
    });
    this.param = new FindHistoParam();
    this.displayedColumns = ['historise', 'dateComptable', 'dateValeur', 'refComptable', 'libelle',
      'utilisateur', 'montantDebit', 'montantCredit', 'soldeApres'];
    this.searchUrl = environment.api.accountPage;


    this.searchUrl = environment.api.accountPositionHistory;
  }

  ngOnInit(): void {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(params);
        if (params.code !== '') {
          super.builSearchCriterias();
          this.searchCriteria.max = 1;
          this.searchCriteria.first = 0;
          this.equal["numeroCompte"] = params.code;
          this.searchCriteria.equal = this.equal;
          this.apiService.post(environment.api.accountPage, this.searchCriteria).subscribe((data) => {
            console.log('------------------------------------------------------------');
            console.log(data);
            if (data.success) {
              // this.searchDetails.setValue
              this.searchDetails.controls['compte'].setValue(data.returnValue[0]);
              this.initialAccount = data.returnValue[0];
            }
          })
        }
      })
  }

  search() {
    super.search();
    this.logger.info(this.searchDetails.value);
    console.log(this.searchDetails.value);

    if (this.searchDetails.value.dateDebut == null || this.searchDetails.value.dateFin == null) {
      this.alerteDialog("Veuillez inserer la date de debut et la date de fin");
      return;
    } else {
      this.param.debut = this.searchDetails.value.dateDebut.toLocaleString();
      this.param.fin = this.searchDetails.value.dateFin.toLocaleString();
    }

    if (this.searchDetails.value.compte?.item == null) {
      this.alerteDialog("Veuillez choisir un compte");
      return;
    }

    this.param.numeroCompte = this.searchDetails.value.compte?.item?.numeroCompte;
    this.param.cleCompte = this.searchDetails.value.compte?.item?.cleCompte;

    this.param.montDeb = this.searchDetails.value.montantMin;
    this.param.montFin = this.searchDetails.value.montantMax;

    this.param.operation = this.searchDetails.value.typeOperation?.item?.code;
    this.param.sens = this.searchDetails.value.sens ? this.searchDetails.value.sens : 'Credit';
    this.param.userSaisi = null;
    this.param.userValid = null;
    console.log(this.param);

    this.accountService.findHistoryPositionAccount(this.param).subscribe((response: any) => {
      console.log(response);
      this.dataSource = new MatTableDataSource<any>((response as any).returnValue.lignes);
      this.soldeOuverture = response.returnValue.soldeOuverture;
      this.cumulDebit = response.returnValue.cumulDebit;
      this.cumulCredit = response.returnValue.cumulCredit;
    });

  }
  selectedItem(item) {
    this.selectedItemOnTables = item;

  }
  openConsultationLots() {
    console.log(this.selectedItemOnTables)
    if (this.selectedItemOnTables.referencePiece == '') {
      this.alerteDialog('Veuilez choisir une ligne');
      return;
    }
    const dialogRef = this.dialog.open(ConsultationLotsComponent, {
      data: this.selectedItemOnTables,
      height: '80vh',
      width: '90vw',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}

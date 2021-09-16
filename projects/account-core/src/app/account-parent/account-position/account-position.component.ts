import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { IHash, SearchParam } from 'projects/shared-lib/src/domain/SearchParam';
import { MainComponent } from 'projects/shared-lib/src/template/main/main.component';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';

@Component({
  selector: 'microfi-account-position',
  templateUrl: './account-position.component.html',
  styleUrls: ['./account-position.component.scss']
})
export class AccountPositionComponent extends MainComponent {

  agence: string;
  typeCompte: string;
  chapitre: string;
  devise: string;
  racineCompte: string;
  produit: string;
  cle: string;
  soldeComptable: string;
  soldeJournalier: string;
  montantReserve: string;
  montantDecouvert: string;
  dateFinDecouvert: string;
  soldeDisponible: string;
  etat: string;

  accountPosition: any;
  optionsGestionnaire: string[] = [];
  filteredOptionsGestionnaire: Observable<string[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  param: SearchParam;
  searchDetails: FormGroup;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;

  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlGestionnaireList = environment.api.accountManagerList;

  compte_ferme = false;
  compte_solde_null = false;

  constructor(injector: Injector) {
    super(injector)
    this.searchDetails = this.formGroupBuilder.group({
      uniteBancaire: [],
      agence: [],
      membre: [],
      gestionnaire: [''],
      profil: [''],
      compte_ferme: [false],
      compte_solde_null: [false],
    });
    this.searchCriteria = new SearchParam();
    this.displayedColumns = ['agence', 'typeCompte', 'chapitre', 'devise', 'racineCompte',
      'produit', 'cle', 'soldeComptable', 'soldeJournalier', 'montantReserve', 'montantDecouvert', 'dateFinDecouvert',
      'soldeDisponible', 'etat'];
    this.searchUrl = environment.api.accountPage;

    this.customerService.getGestionnaire().subscribe((data) => {
      data.returnValue.forEach((item) => this.optionsGestionnaire.push(item.code + " - " + item.nom));

      this.filteredOptionsGestionnaire = this.searchDetails.get('gestionnaire').valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filterGestionnaire(value) : this.optionsGestionnaire.slice())
      );

    });

  }

  private _filterGestionnaire(value): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsGestionnaire.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
  }


  find() {
    console.log(this.searchDetails.value);
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};

    this.logger.info(this.searchDetails);
    if (this.searchDetails.value.membre) {
      alias["client"] = "client";
      equal["client.code"] = this.searchDetails.value.membre.item?.idClient;
    }

    if (this.searchDetails.value.profil) {
      alias["client"] = "client";
      alias["client.profilClient"] = "profilClient";
      equal["profilClient.code"] = this.searchDetails.value.profil.item?.code;
    }
    if (this.searchDetails.value.gestionnaire) {
      alias["client"] = "client";
      alias["client.gestionnaire"] = "gestionnaire";
      equal["gestionnaire.code"] = this.searchDetails.value.gestionnaire.item?.code;
    }
    if (this.searchDetails.value.compte_ferme) {
      equal["etatCompte"] = 3;
    }
    if (this.searchDetails.value.compte_solde_null) {
      equal["soldeComptable"] = "0";
    }

    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    this.searchCriteria.equal = equal;
    this.logger.info(this.searchCriteria);
    super.builSearchCriterias(this.searchCriteria);
    super.find(this.accountPosition);

    this.accountService.findPositionCompte(this.searchCriteria).subscribe((data) => {
      console.log(data);
      console.log(data.returnValue);
      this.dataSource = new MatTableDataSource<PeriodicElementPositionCompte>(data.returnValue);
    });

  }
  selectedItem(data) {
    this.selectedItemOnTables = data;
  }
  consultHistorique() {
    if (this.selectedItemOnTables.client === null || this.selectedItemOnTables.client === undefined) {
      this.router.navigate(['account/' + environment.routes.accountPositionHistory.url], { queryParams: { mode: Dialog.MODIFICATION, code: "", idClient: "" } });
    } else {
      this.router.navigate(['account/' + environment.routes.accountPositionHistory.url], { queryParams: { mode: Dialog.MODIFICATION, code: this.selectedItemOnTables.numeroCompte, idClient: this.selectedItemOnTables.client.idClient } });
    }

  }

}

export interface PeriodicElementPositionCompte {
  agence: string;
  typeCompte: string;
  chapitre: string;
  devise: string;
  racineCompte: string;
  produit: string;
  cle: string;
  soldeComptable: string;
  soldeJournalier: string;
  montantReserve: string;
  montantDecouvert: string;
  dateFinDecouvert: string;
  soldeDisponible: string;
  etat: string;
}

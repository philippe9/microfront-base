import { Component, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Reservation } from 'projects/shared-lib/src/domain/reservation';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { IHash, SearchParam } from 'projects/shared-lib/src/domain/SearchParam';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';

@Component({
  selector: 'microfi-account-reservation-list',
  templateUrl: './account-reservation-list.component.html',
  styleUrls: ['./account-reservation-list.component.scss']
})
export class AccountReservationListComponent extends ViewComponent {

  param: SearchParam;
  searchDetails: FormGroup;
  urlAccountReservationView = environment.routes.reservationView.url;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlDeviseList = environment.api.deviseList;
  Disabled = false;
  en_cours = false;


  constructor(injector: Injector) {
    super(injector)
    this.searchDetails = this.formGroupBuilder.group({
      uniteBancaire: [],
      agence: [],
      compte: [],
      en_cours: [false],
      devise: [''],
      numCompte: [''],
      cle: [''],
      intituleCompte: [''],
      intituleClient: [''],
    });
    this.displayedColumns = ['agence', 'compte', 'montant', 'motif', 'enCours', 'utilSaisi',
      'dateLevee', 'montantLeve', 'utilLeve'];
    this.searchUrl = environment.api.reservationAccountPage;
  }

  ngOnInit(): void {
  }




  search() {
    console.log(this.searchDetails.value);
    super.builSearchCriterias();
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    alias["compte"] = "compte";
    /* alias["unite"] = "unite";
    alias["agence"] = "agence"; */
    // alias["compte.unite"] = "compte.unite";
    // alias["compte.agence"] = "compte.agence";
    equal["compte.numeroCompte"] = this.searchDetails.value.compte?.item?.numeroCompte;
    equal["compte.cleCompte"] = this.searchDetails.value.compte?.item?.cleCompte;
    // equal["unite.code"] = this.searchDetails.value.uniteBancaire?.item?.code;
    // equal["agence.code"] = this.searchDetails.value.agence?.item?.code;

    if (this.searchDetails.value.en_cours) {
      equal["enCours"] = this.searchDetails.value.en_cours;
    }

    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.codeAgence = this.searchDetails.value.agence?.item?.code;
    this.searchCriteria.codeUnite = this.searchDetails.value.agence?.item?.code;
    this.searchCriteria.alias = alias;
    this.searchCriteria.first = 0;
    this.searchCriteria.max = 30;
    console.log(this.searchCriteria);
    super.find(new Reservation);

    /* this.accountService.findPositionCompte(this.param).subscribe((data) => {
      console.log(data);
      console.log(data.returnValue);
      this.dataSource = new MatTableDataSource<PeriodicElementPositionCompte>(data.returnValue);
    }); */
  }

  public redirectToUpdate = (code: string,) => {
    if (this.selectedItemOnTables.montantLev <= 0) {
      this.router.navigate([environment.routes.reservationView.url], { queryParams: { mode: Dialog.MODIFICATION, code: code } });
    } else {
      this.alerteDialog('Levee impossible');
    }

  }

  public redirectToView = (code: string) => {
    this.router.navigate([environment.routes.reservationView.url], { queryParams: { mode: Dialog.CONSULTATION, code: code } });
  }
  selectedItem(item: any) {
    this.selectedItemOnTables = item;
  }

}

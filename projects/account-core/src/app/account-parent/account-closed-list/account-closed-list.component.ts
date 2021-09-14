import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompteFermetureDTO } from 'projects/shared-lib/src/domain/CompteFermetureDTO';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { IHash } from 'projects/shared-lib/src/domain/SearchParam';
import { MainComponent } from 'projects/shared-lib/src/template/main/main.component';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';

@Component({
  selector: 'microfi-account-closed-list',
  templateUrl: './account-closed-list.component.html',
  styleUrls: ['./account-closed-list.component.scss']
})
export class AccountClosedListComponent extends MainComponent {

  urlAccountClosedView = environment.routes.closedAccountView.url;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  searchDetails: FormGroup;

  ngAfterViewInit() {
  }

  constructor(injector: Injector) {
    super(injector);

    this.searchDetails = this.formGroupBuilder.group({
      uniteBancaire: [],
      numeroCompte: [''],
      cleCompte: [''],
      natureChapitreCompte: [''],
      etatCloture: ['']
    });

    this.displayedColumns = ['compte', 'dateOperation', 'montant', 'codeOperation', 'colleteur', 'actions'];
    //this.searchUrl = environment.api.fermetureComptePage;
  }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchDetails.value);
    this.searchUrl = environment.api.fermetureComptePage;
    super.builSearchCriterias();
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    alias["unite"] = "unite";
    alias["compteACloturer"] = "compteACloturer";
    alias["compteACloturer.chapitre"] = "compteACloturer.chapitre";
    equal["compteACloturer.numeroCompte"] = this.searchDetails.value.numeroCompte;
    equal["compteACloturer.cleCompte"] = this.searchDetails.value.cleCompte;
    equal["unite.code"] = this.searchDetails.value.uniteBancaire?.item?.code;

    if (this.searchDetails.value.natureChapitreCompte != "") {
      equal["compteACloturer.chapitre.nature"] = this.searchDetails.value.natureChapitreCompte;
    }

    if (this.searchDetails.value.etatCloture) {
      equal["valide"] = this.searchDetails.value.etatCloture;
    }

    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    console.log(this.searchCriteria);
    super.find(new CompteFermetureDTO);

  }

}




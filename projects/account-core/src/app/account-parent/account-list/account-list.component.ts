import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { IHash } from 'projects/shared-lib/src/domain/SearchParam';
import { SelectAutoCompleteModel } from 'projects/shared-lib/src/template/select-auto-complete/select-auto-complete.model';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';

@Component({
  selector: 'microfi-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent extends ViewComponent {

  public searchFormGroup: FormGroup;
  public autoComplete: FormGroup;
  urlUniteBancaireList: string = environment.api.uniteBancaireList;
  urlAgenceList: string = environment.api.agenceList;
  selectAutoCompleteModel: SelectAutoCompleteModel;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;

  urlAccountView = environment.routes.accountView.url;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(injector: Injector) {
    super(injector);
    this.base = this.environment.module.AccountListComponent;
    this.searchUrl = environment.api.accountPage;
  }

  ngOnInit(): void {
    this.searchFormGroup = this.formGroupBuilder.group({
      unite: [],
      agence: [],
      cleCompte: [],
      codeChapitre: [],
      etat: [],
      idAgence: [],
      idUnite: [],
      intitule: [],
      numCompte: []
    });
    this.displayedColumns = ['agence', 'typeCompte', 'chapitre', 'devise', 'racineCompte', 'produit', 'cle', 'intitule', 'date', 'gestionnaire', 'membre'];
  }

  goto(id: any) {
    this.router.navigate(['/account-view', id], { queryParams: { mode: this.edit } })
  }

  find() {
    super.builSearchCriterias();
    this.logger.info(this.searchFormGroup.value);
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    //  alias["unite"] = "unite";
    //  alias["agence"] = "agence";
    if (this.searchFormGroup.value.codeChapitre !== null) {
      alias["chapitre"] = "chapitre";
      like["chapitre.code"] = this.searchFormGroup.value.codeChapitre + '%';
    }
    if (this.searchFormGroup.value.numCompte !== null) {
      like["numeroCompte"] = this.searchFormGroup.value.numCompte + '%';
    }
    if (this.searchFormGroup.value.cleCompte !== null) {
      like["cleCompte"] = this.searchFormGroup.value.cleCompte + '%';
    }
    if (this.searchFormGroup.value.intitule !== null) {
      like["intitule"] = this.searchFormGroup.value.intitule + '%';
    }
    // if (this.searchFormGroup.value.etat !== null) {
    //   equal["etat"] = this.searchFormGroup.value.etat;
    // }



    //  equal["unite.code"] = this.searchFormGroup.value.unite.code;
    //  equal["agence.code"] = this.searchFormGroup.value.agence.code;

    this.searchCriteria.codeUnite = this.searchFormGroup.value.unite.item.code;
    this.searchCriteria.codeAgence = this.searchFormGroup.value.agence.item.code;
    this.searchCriteria.etat = this.searchFormGroup.value.etat ? this.searchFormGroup.value.etat : '';
    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    this.logger.info(this.searchCriteria);
    super.find(FormGroup);
  }
  openPage(type) {
    switch (type) {
      case "Modifier":
        this.router.navigate(['/account/edit', this.selectedItemOnTables.cleCompte, this.selectedItemOnTables.numeroCompte]);
        break;
      case "Consulter":
        this.router.navigate(['/account/view', this.selectedItemOnTables.cleCompte, this.selectedItemOnTables.numeroCompte]);
        break;
      case "Valider":
        this.router.navigate(['/account/validate', this.selectedItemOnTables.cleCompte, this.selectedItemOnTables.numeroCompte]);
        break;

      default:
        break;
    }
  }
  selectedItem(item: any) {
    this.selectedItemOnTables = item;
  }
}



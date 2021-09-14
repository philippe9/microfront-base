import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { IHash, SearchParam } from 'projects/shared-lib/src/domain/SearchParam';
import { MainComponent } from 'projects/shared-lib/src/template/main/main.component';
import { FormGroup } from '@angular/forms';
import { OppositionCompteDTO } from 'projects/shared-lib/src/domain/OppositionCompteDTO';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';

@Component({
  selector: 'microfi-account-opposition-list',
  templateUrl: './account-opposition-list.component.html',
  styleUrls: ['./account-opposition-list.component.scss']
})
export class AccountOppositionListComponent extends ViewComponent {
  searchDetails: FormGroup;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlDeviseList = environment.api.deviseList;
  urlAccountOppositionView = environment.routes.oppositionView.url;
  urlTypeOppositionList = environment.api.typeOppositionList + environment.codeUniteBancaire;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
  }

  levee = false;
  compte_form = false;
  constructor(injector: Injector) {
    super(injector);

    this.searchDetails = this.formGroupBuilder.group({
      uniteBancaire: [],
      agence: [],
      devise: [''],
      numeroCompte: [''],
      cleCompte: [''],
      compte: [''],
      typeOpposition: [''],
      intituleCompte: [''],
      intituleClient: [''],
      dateDebutOpposition: [''],
      dateFinOpposition: [''],
      levee: [''],
    });

    this.displayedColumns = ['typeOpposition', 'compte', 'motif', 'parMembre', 'dateOpposition', 'utilSaisi',
      'dateLevee', 'utilLeve'];
    //this.searchUrl = environment.api.oppositionComptePage;
  }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchDetails.value);
    super.builSearchCriterias();
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    this.base = environment.api.oppositionPage
    this.searchUrl = environment.api.oppositionPage
    alias["compte"] = "compte";
    alias["unite"] = "unite";
    alias["agence"] = "agence";
    alias["typeOpposition"] = "typeOpposition";
    equal["compte.numeroCompte"] = this.searchDetails.value.compte?.item?.numeroCompte;
    equal["compte.cleCompte"] = this.searchDetails.value.compte?.item?.cleCompte;
    equal["unite.code"] = this.searchDetails.value.uniteBancaire?.item?.code;
    equal["agence.code"] = this.searchDetails.value.agence?.item?.code;
    equal["typeOpposition.code"] = this.searchDetails.value.typeOpposition?.item?.code;
    //equal["dateOpposition"] = [this.searchDetails.value.dateDebutOpposition, this.searchDetails.value.dateFinOpposition];

    if (this.searchDetails.value.levee) {
      equal["isLevee"] = this.searchDetails.value.levee;
    }

    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    console.log(this.searchUrl);
    console.log(this.searchCriteria);
    super.find(new OppositionCompteDTO);

    // this.apiService.post(this.base, this.searchCriteria).subscribe((data) => {
    //   console.log(data);
    //   if (data.success) {
    //     this.dataSource = data.returnValue;
    //   }
    // })
  }

  public redirectToUpdate = (code: string) => {
    console.log(code);
    this.router.navigate([environment.routes.accountCancelOpposition.url], { queryParams: { mode: Dialog.MODIFICATION, code: code } });
  }
  selectedItem(item: any) {
    this.selectedItemOnTables = item;
  }
  async leveOppositionCompte() {
    let result = await this.confirmationDialog({ heading: "Confirmation", message: "Voulez vous lever l'opposition sur ce compte ?", type: "warn" });
    if (result) {
      var account = Object.assign({}, this.selectedItemOnTables);
      delete account.montant;
      // delete account.poidsSigLevee;
      // delete account.poidsSignature;
      account.codeUser = "ROOT";
      this.apiService.post(environment.api.leveeOppositionCompte, account).subscribe((data) => {
        if (data.success) {
          this.alerteDialog('Opposition Leve');
          this.search();
        }
      })
    }
  }
}


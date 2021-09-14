import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { MainComponent } from 'projects/shared-lib/src/template/main/main.component';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { IHash, SearchParam } from 'projects/shared-lib/src/domain/SearchParam';

@Component({
  selector: 'microfi-sleeper-account-list',
  templateUrl: './sleeper-account-list.component.html',
  styleUrls: ['./sleeper-account-list.component.scss']
})
export class SleeperAccountListComponent extends MainComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  searchDetails: FormGroup;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  param: SearchParam;


  ngAfterViewInit() {
  }

  en_cours = false;
  dormant = false;

  constructor(injector: Injector) {
    super(injector);

    this.searchDetails = this.formGroupBuilder.group({
      uniteBancaire: [],
      agence: [],
      numeroCompte: [''],
      cleCompte: [''],
      enCours: [''],
      dormant: [''],

    });
    this.displayedColumns = ['agence', 'numeroCompte', 'intitule', 'dateDeclaration', 'enCours', 'dormant',
      'utiLeve', 'dateLevee'];
    this.searchUrl = environment.api.compteSansMouvementPage;
  }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchDetails.value);
    super.builSearchCriterias();
    let searchLink = environment.api.compteSansMouvementPage;
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    alias["compte"] = "compte";
    alias["compte.unite"] = "compte.unite";
    alias["compte.agence"] = "compte.agence";
    equal["compte.numeroCompte"] = this.searchDetails.value.numCompte;
    equal["compte.cleCompte"] = this.searchDetails.value.cleCompte;
    equal["compte.unite.code"] = this.searchDetails.value.uniteBancaire?.item?.code;
    equal["compte.agence.code"] = this.searchDetails.value.agence?.item?.code;


    if (this.searchDetails.value.uniteBancaire?.item) {
      searchLink = searchLink + '/' + this.searchDetails.value.uniteBancaire?.item?.code
    } else {
      searchLink = searchLink + '/';
    }

    if (this.searchDetails.value.agence?.item) {
      searchLink = searchLink + '/' + this.searchDetails.value.agence?.item?.code
    } else {
      searchLink = searchLink + '/';
    }

    if (this.searchDetails.value.numeroCompte != "") {
      searchLink = searchLink + '/' + this.searchDetails.value.numeroCompte;
    } else {
      searchLink = searchLink + '/0';
    }

    if (this.searchDetails.value.enCours != "") {
      equal["enCours"] = this.searchDetails.value.enCours;
      searchLink = searchLink + '/' + this.searchDetails.value.enCours;
    } else {
      searchLink = searchLink + '/Non';
    }

    if (this.searchDetails.value.dormant != "") {
      equal["dormant"] = this.searchDetails.value.dormant
      searchLink = searchLink + '/' + this.searchDetails.value.dormant;

    } else {
      searchLink = searchLink + '/Oui'
    }


    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    console.log(this.searchCriteria);
    this.apiService.get(searchLink).subscribe((data) => {
      console.log(data)
    })
    // super.find(new CompteSansMouvementPage);


  }

}

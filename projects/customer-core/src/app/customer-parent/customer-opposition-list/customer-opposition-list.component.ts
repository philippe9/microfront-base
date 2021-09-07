import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IHash } from 'projects/shared-lib/src/domain/SearchParam';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { RequestType } from '../../../../../shared-lib/src/domain/request-type.enum';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'microfi-customer-opposition-list',
  templateUrl: './customer-opposition-list.component.html',
  styleUrls: ['./customer-opposition-list.component.scss']
})
export class CustomerOppositionListComponent extends ViewComponent {
  oppositionForm: FormGroup;
  resquesTypePost: RequestType = RequestType.POST;
  resquesTypeGet: RequestType = RequestType.GET;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlTypeOppositionList = environment.api.typeOppositionList + environment.codeUniteBancaire;
  displayedColumns = ['position', 'name', 'weight', "Saisi", "leve", "utiLeve"]
  constructor(injector: Injector) {
    super(injector);
    this.base = environment.api.oppositionClientsPage;
    this.requestType = RequestType.GET;
    // this.;

  }

  ngOnInit(): void {
    this.oppositionForm = this.formGroupBuilder.group({
      uniteBancaire: [], account: [],
      agence: [], typeOpposition: [], membre: [],
      dteDebutOpposition: [], dteFinOpposition: [],
      refBordOppo: [], levee: []
    });
  }

  find() {
    super.builSearchCriterias();
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    alias["unite"] = "unite";
    alias["agence"] = "agence";
    alias["typeOpposition"] = "typeOpposition";

    console.log(this.oppositionForm);

    if (this.oppositionForm.value.uniteBancaire !== null) {
      equal["unite.code"] = this.oppositionForm.value.uniteBancaire?.item?.code;
    }
    if (this.oppositionForm.value.agence !== null) {
      equal["agence.code"] = this.oppositionForm.value.agence?.item?.code;
    }
    if (this.oppositionForm.value.levee !== null) {
      equal["isLevee"] = this.oppositionForm.value.isLevee;
    }
    if (this.oppositionForm.value.dteDebutOpposition !== null) {
      equal["dateOpposition"] = this.oppositionForm.value.dateOpposition;
    }
    // if (this.oppositionForm.value.dteFinOpposition !== null) {
    //   this.base = this.base + '/' + this.oppositionForm.value.dteFinOpposition;
    // }
    if (this.oppositionForm.value.typeOpposition !== null) {
      equal["typeOpposition.code"] = this.oppositionForm.value.typeOpposition?.item?.code;

    }

    if (this.oppositionForm.value.refBordOppo !== null) {
      // this.base = this.base + '/' + this.oppositionForm.value.refBordOppo;
    }
    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    this.searchCriteria.max = 20;
    this.apiService.post(this.base, this.searchCriteria).subscribe((data) => {
      if (data.success) {
        this.dataSource = data.returnValue;
      }

    })
    // super.find(new PhysicalPerson);
  }
  async leveOpposition() {
    let customer = this.selectedItemOnTables;
    let result = await this.confirmationDialog({ heading: "Confirmation", message: "Voulez vous lever cette opposition", type: "warn" });
    console.log(result);
    if (result) {
      // simulation.dateDernEcheance = this.dateInvert(simulation.dateDernEcheance);
      // simulation.dateMiseEnPlace = this.dateInvert(simulation.dateMiseEnPlace);
      customer.userCode = "NKOU";

      let data = this.apiService.post(environment.api.leveeOppositionClient, customer).toPromise();
      console.log(data);
    } else {

    }
  }
  selectedItem(item: any) {
    this.selectedItemOnTables = item;
  }
}

import { Component, Injector } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ViewComponent } from '../../../../../shared-lib/src/template/view/view.component';
import { SearchParam, IHash } from '../../../../../shared-lib/src/domain/SearchParam';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { DeathClient } from '../../../../../shared-lib/src/domain/DeathClient';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';

@Component({
  selector: 'microfi-deceased-customer-list',
  templateUrl: './deceased-customer-list.component.html',
  styleUrls: ['./deceased-customer-list.component.scss']
})
export class DeceasedCustomerListComponent extends ViewComponent {
  param: SearchParam;
  searchInfo: FormGroup;

  urlDeadCustomerView = environment.routes.deadCustomerView.url;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;

  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;


  constructor(injector: Injector) {
    super(injector);
    //this.searchUrl = environment.api.clientDecedePage;
    this.displayedColumns = ['agence', 'membre', 'dateDeces', 'utiCre', 'utiValid', 'dateValid'];
  }

  ngOnInit(): void {
    this.searchInfo = this.formGroupBuilder.group({
      unite: [], agence: [], customer: []
    });
  }

  goto(id: any) {
    this.router.navigate([this.environment.routes.deadCustomerView.url], { queryParams: { mode: this.edit } })
  }

  find() {
    super.builSearchCriterias();
    this.searchUrl = environment.api.decedeClientPage;
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    alias["client"] = "client";
    equal["client.code"] = this.searchInfo.value.membre;
    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    this.searchCriteria.first = 0;
    this.searchCriteria.max = 10;
    super.find(new DeathClient);
    let model = new DeathClient;
    super.find(model);
    console.log(this.dataSource);
  }
  selectedItem(item) {
    this.selectedItemOnTables = item;

  }
  async validateDeces() {
    if (this.selectedItemOnTables.utiValid == null) {


      let result = await this.confirmationDialog({ heading: "Confirmation", message: "Voulez vous valider le deces de ce client ?", type: "warn" });
      if (result) {
        this.apiService.post(environment.api.decedeClientValidate, this.selectedItemOnTables).subscribe((data) => {
          if (data.success) {
            this.alerteDialog("Validation du deces");
            this.find();
          }
        })
      }
    }
    else {
      this.alerteDialog("Deces deja validé");
    }
  }
  updateDeces() {
    this.router.navigate(['customer/' + environment.routes.deadCustomerView.url], { queryParams: { mode: Dialog.MODIFICATION, code: this.selectedItemOnTables.id } });
  }
}

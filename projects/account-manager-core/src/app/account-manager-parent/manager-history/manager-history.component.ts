import { FormGroup } from '@angular/forms';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { MicrofiUserFormComponent } from 'projects/shared-lib/src/template/microfi-user-form/microfi-user-form.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'microfi-manager-history',
  templateUrl: './manager-history.component.html',
  styleUrls: ['./manager-history.component.scss']
})
export class ManagerHistoryComponent extends ViewComponent {
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;

  urlClients = environment.api.doFindClientPost;
  findDTOUsers = {
    codeAgence: "0904",
    codeUnite: "0001",
    max: 10
  }
  managerHistoryFormGroup: FormGroup;
  response: any;
  env: any;
  DisableClient: boolean = false;
  labelClient: string = "Compte Client"

  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlDeviseList = environment.api.agenceList;
  filteredOptions: Observable<string[]>;

  constructor(injector: Injector) {
    super(injector);
    this.displayedColumns = ['numMenbre', 'intituleMenbre', 'numCompte', 'intituleCompte', 'ancienGestionnaire', 'nouveauGestionnaire', 'utiSaisie', 'dateChangement'];

  }

  ngOnInit(): void {
    this.managerHistoryFormGroup = this.formGroupBuilder.group({
      account: [],
      customer: [],
    });
  }

  find() {
    super.builSearchCriterias();
    // this.logger.info(this.managerHistoryFormGroup.value);
    console.log(this.managerHistoryFormGroup.value);
    // return;
    this.searchUrl = environment.api.findGestionnaireHistory;

    if (this.managerHistoryFormGroup.value.customer.item !== null) {
      this.searchUrl = this.searchUrl + '/' + this.managerHistoryFormGroup.value.customer.item.idClient;
    } else {
      this.searchUrl = this.searchUrl + '/0';
    }
    if (this.managerHistoryFormGroup.value.account.item !== null) {
      this.searchUrl = this.searchUrl + '/' + this.managerHistoryFormGroup.value.account.item.numeroCompte + '/' + this.managerHistoryFormGroup.value.account.item.cleCompte;
    } else {
      this.searchUrl = this.searchUrl + '/0/0';
    }
    this.apiService.get(this.searchUrl).subscribe((data) => {
      if (data.success) {
        this.dataSource = data.returnValue;
      }
    })
  }
  selectedUserClicked(user) {
    console.log(user);
    console.log(this.managerHistoryFormGroup.value);
  }
  selectedAccountClicked(account) {
    console.log(account);
  }
}

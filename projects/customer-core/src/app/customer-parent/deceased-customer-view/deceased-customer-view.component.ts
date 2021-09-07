import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { IHash } from '../../../../../shared-lib/src/domain/SearchParam';


@Component({
  selector: 'microfi-deceased-customer-view',
  templateUrl: './deceased-customer-view.component.html',
  styleUrls: ['./deceased-customer-view.component.scss']
})
export class DeceasedCustomerViewComponent extends ViewComponent {

  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  record: FormGroup;
  urlClients = environment.api.doFindClientPost;
  urlTypeOppositionList = environment.api.typeOppositionList + environment.codeUniteBancaire;
  findDTOUsers = {
    codeAgence: "0904",
    codeUnite: "0001",
    max: 10
  }
  currentDeceasedUser = {
    id: ''
  }
  constructor(injector: Injector, private formBuilder: FormBuilder) {
    super(injector);
    console.log(this.activatedRoute.queryParams);
    this.record = this.formBuilder.group({
      unite: [], client: [], agence: [], commentaire: [], dateDeces: []
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.mode = params.mode;//['mode'];
      console.log(this.mode);
      if (this.mode != undefined) {
        super.builSearchCriterias();
        this.searchUrl = environment.api.decedeClientPage;
        let alias: IHash = {};
        let like: IHash = {};
        let equal: IHash = {};
        equal["id"] = parseInt(params.code);
        this.searchCriteria.equal = equal;
        this.searchCriteria.like = like;
        this.searchCriteria.alias = alias;
        this.searchCriteria.first = 0;
        this.searchCriteria.max = 1;
        console.log(this.searchCriteria);
        this.apiService.post(this.searchUrl, this.searchCriteria).subscribe((data) => {
          console.log(data);
          this.currentDeceasedUser = data.returnValue[0];
          this.record.patchValue(
            data.returnValue[0]
          )
        })
      }
    });
  }
  saveDeces() {
    var toSendData = this.record.value;
    toSendData.unite = this.record.value.unite ? (this.record.value.unite.item ? this.record.value.unite.item : this.record.value.unite) : null;
    toSendData.agence = this.record.value.agence ? (this.record.value.agence.item ? this.record.value.agence.item : this.record.value.agence) : null;
    toSendData.client = this.record.value.client ? (this.record.value.client.item ? this.record.value.client.item : this.record.value.client) : null;
    toSendData.client.id = toSendData.client.idClient;
    if (this.currentDeceasedUser.id === '') {
      this.apiService.post(environment.api.decedeClientCreate, toSendData).subscribe((data) => {
        console.log(data);
        if (data.success) {
          this.alerteDialog("Enregistrement du deces");
        } else {
          this.alerteDialog("Une erreur est subvenu");
        }
      })
    } else {
      toSendData.id = this.currentDeceasedUser.id;
      this.apiService.post(environment.api.decedeCientUpdate, toSendData).subscribe((data) => {
        console.log(data);
        if (data.success) {
          this.alerteDialog("Enregistrement de la mise a jour du deces");
        } else {
          this.alerteDialog("Une erreur est subvenu");
        }
      })
    }


  }
}

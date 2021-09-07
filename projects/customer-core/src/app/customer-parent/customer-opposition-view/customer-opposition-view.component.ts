import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { Observable } from 'rxjs';
// import { RequestType } from 'src/app/domain/request-type.enum';
// import { MainComponent } from 'src/app/template/main/main.component';
// import { environment } from 'src/environments/environment.prod';
// import { ViewComponent } from '../../../template/view/view.component';
import { ViewComponent } from '../../../../../shared-lib/src/template/view/view.component';

@Component({
  selector: 'microfi-customer-opposition-view',
  templateUrl: './customer-opposition-view.component.html',
  styleUrls: ['./customer-opposition-view.component.scss']
})
export class CustomerOppositionViewComponent extends ViewComponent {

  record: FormGroup;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlDeviseList = environment.api.deviseList;
  urlClients = environment.api.doFindClientPost;
  urlTypeOppositionList = environment.api.typeOppositionList + environment.codeUniteBancaire;
  findDTOUsers = {
    codeAgence: "0904",
    codeUnite: "0001",
    max: 10
  }
  options: string[] = ['00001 - Groupe MUFFA', '00022 - Groupe TIFFO', '000011 - Groupe HIPPO'];
  filteredOptions: Observable<string[]>;


  constructor(injector: Injector, private formBuilder: FormBuilder) {
    super(injector);

    this.record = this.formBuilder.group({
      unite: [], client: [], agence: [], typeOpposition: [], motif: []
    });
  }

  ngOnInit(): void {
  }
  saveOpposition() {
    // console.log(this.record.value);
    var toSendData = this.record.value;
    toSendData.unite = this.record.value.unite ? (this.record.value.unite.item ? this.record.value.unite.item : this.record.value.unite) : null;
    toSendData.typeOpposition = this.record.value.typeOpposition ? (this.record.value.typeOpposition.item ? this.record.value.typeOpposition.item : this.record.value.typeOpposition) : null;
    toSendData.agence = this.record.value.agence ? (this.record.value.typeOpposition.item ? this.record.value.typeOpposition.item : this.record.value.typeOpposition) : null;
    toSendData.client = this.record.value.client ? (this.record.value.client.item ? this.record.value.client.item : this.record.value.client) : null;
    toSendData.client.id = toSendData.client.codePersonne;
    console.log(toSendData);
    // return;
    this.apiService.post(environment.api.miseEnPlaceOppositionClient, this.record.value).subscribe((data) => {
      console.log(data);
      if (data.success) {
        this.alerteDialog("Opposition enregistre");
      } else {
        this.alerteDialog(data.returnMsg);
      }
    })
  }
}


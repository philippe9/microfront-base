import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';

@Component({
  selector: 'microfi-moral-shareholder-dialog',
  templateUrl: './moral-shareholder-dialog.component.html',
  styleUrls: ['./moral-shareholder-dialog.component.scss']
})
export class MoralShareholderDialogComponent implements OnInit {

  personeMoraleInfos = this.formBuilder.group(
    {
      est_membre: [],
      menbre: [],
      raisonSociale: [],
      formeJuridique: [],
      secteurActivite: [],
      adresse: [],
      numRccm: [],
      pourcentageAction: [],
    }
  );

  urlSecteurActiviteList = environment.api.secteurActivite;
  urlFormeJuridiqueList = environment.api.formeJuridiqueList;
  est_membre: boolean = true;
  urlMembreMoraleList = environment.api.moralCustomerList;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;


  onSubmit() {

  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.personeMoraleInfos.disable();
  }

  handleChecked(value) {
    this.est_membre = !value;
    if (this.est_membre == false) {
      this.personeMoraleInfos = this.formBuilder.group(
        {
          est_membre: [],
          menbre: [],
          raisonSociale: [],
          formeJuridique: [],
          secteurActivite: [],
          adresse: [],
          numRccm: [],
          pourcentageAction: [],
        }
      )
      console.log(this.est_membre);
    }
    if (this.est_membre == true) {
      this.personeMoraleInfos.disable();
    }
  }

  handleChange(value) {
    console.log(value);
    if (value == true) {
      this.personeMoraleInfos.patchValue(
        {
          est_membre: "Oui"
        }
      )
    }
    if (value == false) {
      this.personeMoraleInfos.patchValue(
        {
          est_membre: "Non"
        }
      )
    }
  }

}


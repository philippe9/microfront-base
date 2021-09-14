import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { MainComponent } from 'projects/shared-lib/src/template/main/main.component';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { AccountService } from '../account.service';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';

@Component({
  selector: 'microfi-account-closed-view',
  templateUrl: './account-closed-view.component.html',
  styleUrls: ['./account-closed-view.component.scss']
})
export class AccountClosedViewComponent extends ViewComponent {

  record: FormGroup;
  par_membre = false;
  DisableClient = false;
  labelClient = "Compte"
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlDeviseList = environment.api.deviseList;

  constructor(injector: Injector, private formBuilder: FormBuilder) {
    super(injector);

    this.record = this.formBuilder.group({
      uniteBancaire: [],
      agence: [],
      parMembre: [true],
      dateCloture: [new Date],
      soldeApres: [''],
      soldeAvant: [''],
      compte: [''],
      typeOpposition: [, Validators.required],
      compteClotureSoldePlus: [],
      compteClotureSoldeMoins: [],
      motif: [''],
      commissions: [''],
      taxes: [''],
    });
  }

  ngOnInit(): void {
    // this.record.controls['dateCloture'].disable();
    this.record.get('soldeApres').disable();
    this.record.get('soldeAvant').disable();
  }

  doSave() {
    console.log(this.record.value);

    var clotureCompte = {
      numeroCompte: this.record.value.compte.numeroCompte,
      cleCompte: this.record.value.compte.cleCompte,
      codeAgence: this.record.value.compte.agence.code,
      motifFermeture: this.record.value.motif,
      userUpdate: "ROOT",
      dateUpdate: this.record.value.dateCloture,
      fermeture: this.record.value.dateCloture,
    };
    console.log(clotureCompte)
    // return;
    this.apiService.post(environment.api.fermetureCompte, clotureCompte).subscribe((data) => {
      if (data.success) {
        this.alerteDialog('Compte ferme');
      }
    })
  }
  doSimulate() {

  }
}

import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';

@Component({
  selector: 'microfi-account-opposition-view',
  templateUrl: './account-opposition-view.component.html',
  styleUrls: ['./account-opposition-view.component.scss']
})
export class AccountOppositionViewComponent extends ViewComponent {

  record: FormGroup;
  par_membre = false;
  DisableClient = false;
  labelClient = 'Compte client';
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlDeviseList = environment.api.deviseList;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlTypeOppositionList = environment.api.typeOppositionList + environment.codeUniteBancaire;
  oppositionCompte: any = {};
  compte: any = {};
  constructor(injector: Injector, private formBuilder: FormBuilder) {
    super(injector);

    this.record = this.formBuilder.group({
      uniteBancaire: [],
      agence: [],
      parMembre: [true],
      dateOpposition: [new Date],
      devise: [],
      numeroCompte: ['', Validators.required],
      cleCompte: ['', Validators.required],
      intituleCompte: [''],
      intituleClient: [''],
      compte: [''],
      typeOpposition: [, Validators.required],
      poidsRequis: [this.record?.value?.typeOpposition?.item?.code],
      motif: [''],
      commissions: [''],
      taxes: [''],
    });

    // this.oppositionCompte = new OppositionCompteDTO();

  }

  ngOnInit(): void {
  }

  selectedAccountClicked(data) {
    console.log(data);
  }
  submitForm() {
    const formValue = this.record.value;
    console.log(this.compte);
    // return;
    console.log(formValue);
    this.oppositionCompte.unite = formValue.uniteBancaire?.item;
    this.oppositionCompte.agence = formValue.agence?.item;
    this.oppositionCompte.motif = formValue.motif;
    this.oppositionCompte.alaDemande = formValue.parMembre ? "Oui" : "Non";
    this.oppositionCompte.dateOpposition = new Date().toLocaleDateString().split('/').reverse().join('-');
    this.oppositionCompte.compte = this.compte.item;
    // this.oppositionCompte.compte.numeroCompte = formValue.compte?.item?.numeroCompte;
    // this.oppositionCompte.compte.cleCompte = formValue.compte?.item?.cleCompte;
    // this.oppositionCompte.typeOpposition = new TypeOppositionDTOmin();
    this.oppositionCompte.typeOpposition = formValue.typeOpposition?.item;
    this.oppositionCompte.isLevee = "Non";
    this.oppositionCompte.codeUser = "ROOT";

    console.log(this.oppositionCompte);
    // return;
    this.accountService.miseEnPlaceOppositionCompte(this.oppositionCompte).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.alerteDialog("Opposition effectue");
      }


    });

  }


}


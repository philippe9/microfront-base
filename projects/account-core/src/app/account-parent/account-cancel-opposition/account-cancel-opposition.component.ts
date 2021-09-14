import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OppositionCompteDTO } from 'projects/shared-lib/src/domain/OppositionCompteDTO';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { IHash } from 'projects/shared-lib/src/domain/SearchParam';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { MainComponent } from 'projects/shared-lib/src/public-api';

@Component({
  selector: 'microfi-account-cancel-opposition',
  templateUrl: './account-cancel-opposition.component.html',
  styleUrls: ['./account-cancel-opposition.component.scss']
})
export class AccountCancelOppositionComponent extends MainComponent implements OnInit {

  record: FormGroup;
  par_membre = false;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlDeviseList = environment.api.deviseList;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlTypeOppositionList = environment.api.typeOppositionList + environment.codeUniteBancaire;
  oppositionCompte: OppositionCompteDTO;
  oppositionComtpeView: OppositionCompteDTO;
  oppositionCode: string;
  disabledParMembre = true;

  constructor(injector: Injector, private formBuilder: FormBuilder) {
    super(injector);

    this.record = this.formBuilder.group({
      uniteBancaire: [],
      agence: [],
      parMembre: [true],
      dateLevee: [new Date],
      devise: [],
      numeroCompte: ['', Validators.required],
      cleCompte: ['', Validators.required],
      intituleCompte: [''],
      intituleClient: [''],
      typeOpposition: [, Validators.required],
      poidsRequis: [this.record?.value?.typeOpposition?.item?.code],
      motif: [''],
      motifLevee: [''],
      commissions: [''],
      taxes: [''],
    });

    this.oppositionCompte = new OppositionCompteDTO();
    this.oppositionComtpeView = new OppositionCompteDTO();
    //this.searchUrl = environment.api.oppositionComptePage;

    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(params);
        this.mode = params.mode;

        console.log(params.code);
        super.builSearchCriterias();
        this.oppositionCode = params.code;
        let alias: IHash = {};
        let like: IHash = {};
        let equal: IHash = {};
        equal["code"] = params.code;
        this.searchCriteria.equal = equal;
        this.searchCriteria.like = like;
        this.searchCriteria.alias = alias;
        this.searchCriteria.first = 0;
        this.searchCriteria.max = 1;


        this.apiService.post(this.searchUrl, this.searchCriteria)
          .subscribe((data) => {
            console.log(data.returnValue);
            this.oppositionComtpeView = data.returnValue;

            this.record = this.formBuilder.group(
              {
                /* uniteBancaire:[],
                agence: [],
                devise: [], */
                compte: [],
                numeroCompte: [data.returnValue[0].compte.numeroCompte],
                cleCompte: [data.returnValue[0].compte.cleCompte],
                intituleCompte: [data.returnValue[0].compte.intituleCompte],
                intituleClient: [data.returnValue[0].compte.intituleClient],
                parMembre: [true],
                dateLevee: [data.returnValue[0].dteLeve],
                motif: [data.returnValue[0].motif],
                motifLevee: [data.returnValue[0].motifLevee],
                commissions: [''],
                taxes: [''],
              }
            )
            this.record.disable();
            this.record.get('motifLevee').enable();  //Disable le formulaire
          });


      });

  }

  ngOnInit(): void {
  }


  submitForm() {
    const formValue = this.record.value;
    console.log(formValue);
    /* this.oppositionCompte.unite = formValue.uniteBancaire?.item;
    this.oppositionCompte.agence = formValue.agence?.item;
    this.oppositionCompte.motif = formValue.motif;
    this.oppositionCompte.alaDemande = formValue.parMembre ? "Oui": "Non";
    this.oppositionCompte.dateOpposition = new Date().toLocaleDateString();
    this.oppositionCompte.compte = new CompteDTO();
    this.oppositionCompte.compte.numeroCompte = formValue.numeroCompte;
    this.oppositionCompte.compte.cleCompte = formValue.cleCompte;
    this.oppositionCompte.typeOpposition = new TypeOppositionDTOmin();
    this.oppositionCompte.typeOpposition = formValue.typeOpposition?.item; */
    this.oppositionComtpeView[0].isLevee = "Oui";
    this.oppositionComtpeView[0].motifLevee = formValue.motifLevee;
    this.oppositionComtpeView[0].dateLevee = new Date().toLocaleDateString();
    console.log(this.oppositionComtpeView[0]);

    this.accountService.leveeOppositionCompte(this.oppositionComtpeView[0]).subscribe((response: any) => {
      console.log(response);
    });

  }


}

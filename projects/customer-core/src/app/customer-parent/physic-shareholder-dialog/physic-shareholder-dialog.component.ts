import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';

@Component({
  selector: 'microfi-physic-shareholder-dialog',
  templateUrl: './physic-shareholder-dialog.component.html',
  styleUrls: ['./physic-shareholder-dialog.component.scss']
})
export class PhysicShareholderDialogComponent implements OnInit {

  personePhysiqueInfos: FormGroup;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlCiviliteList = environment.api.civiliteList;
  urlPaysList = environment.api.paysList;
  urlAgentEconomique = environment.api.agentEconomique;
  urlNationalite = environment.api.nationalite;
  urlProfessionList = environment.api.professionList;
  urlTypePieceList = environment.api.typePieceList;
  est_membre = false;
  urlClients = environment.api.doFindClientPost;
  findDTOUsers = {
    codeAgence: "0904",
    codeUnite: "0001",
    max: 10
  }
  urlMembrePhysiqueList = environment.api.physicalCustomerList;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.personePhysiqueInfos = this.formBuilder.group(
      {
        est_membre: [],
        membre: [],
        nom: [],
        prenom: [],
        lieuNaissance: [],
        dateNaissance: [],
        nomPere: [],
        nomMere: [],
        numRccm: [],
        nationalite: [],
        profession: [],
        lieuResidence: [],
        typePiece: [],
        numPiece: [],
        dateDelivrance: [],
        dateExpiration: [],
        pourcentageAction: []
      }
    );

    this.personePhysiqueInfos.get('est_membre').valueChanges.subscribe(v => {
      if (v) {

        this.personePhysiqueInfos.get('nom').disable();
        this.personePhysiqueInfos.get('prenom').disable();
        this.personePhysiqueInfos.get('lieuNaissance').disable();
        this.personePhysiqueInfos.get('dateNaissance').disable();
        this.personePhysiqueInfos.get('nomPere').disable();
        this.personePhysiqueInfos.get('nomMere').disable();
        this.personePhysiqueInfos.get('numRccm').disable();
        this.personePhysiqueInfos.get('nationalite').disable();
        this.personePhysiqueInfos.get('profession').disable();
        this.personePhysiqueInfos.get('lieuResidence').disable();
        this.personePhysiqueInfos.get('typePiece').disable();
        this.personePhysiqueInfos.get('numPiece').disable();
        this.personePhysiqueInfos.get('dateDelivrance').disable();
        this.personePhysiqueInfos.get('dateExpiration').disable();
        this.personePhysiqueInfos.get('pourcentageAction').disable();

      }
    })
  }


  handleChange(value) {
    console.log(value);
  }

  onSubmit() {
    console.log("sumbilslslsllslsls");

    const formValue = this.personePhysiqueInfos.value;

    /* this.user.unite.id = formValue.uniteBancaire?.item?.id;
    this.user.civilite.id = formValue.civilite?.item?.id;
    this.user.nationalite.id = formValue.nationalite?.item?.id;
    this.user.paysNaissance.id = formValue.paysNaissance?.item?.id;
    this.user.paysResidence.id = formValue.paysResidence?.item?.id;
    this.user.profession.id = formValue.profession?.item?.id;
    this.user.typePiece.id = formValue.typePiece?.item?.id;

    this.user.code = formValue.code;
    this.user.dateDelivrancePiece = formValue.dateDelivrance;
    this.user.dateExpirationPiece = formValue.dateExpiration;
    this.user.dateNaissance = formValue.dateNaissance;
    this.user.lieuDelivrancePiece = formValue.lieuDelivrance;
    this.user.lieuNaissance = formValue.lieuNaissance;
    this.user.nom = formValue.nom;
    this.user.prenom = formValue.prenom;
    this.user.nomJeuneFille = formValue.nomJeuneFille;
    this.user.numeroPieceIdentite = formValue.numeroPieceIdentite;
    this.user.sexe = formValue.sexe; */
  }

}


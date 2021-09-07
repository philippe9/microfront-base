import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Parametre } from 'projects/shared-lib/src/domain/Parametre';
import { UniteDTO } from 'projects/shared-lib/src/domain/UniteDTO';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { MainComponent } from 'projects/shared-lib/src/template/main/main.component';
import { Person } from '../../../../../shared-lib/src/domain/person';
import { RequestType } from '../../../../../shared-lib/src/domain/request-type.enum';


@Component({
  selector: 'microfi-create-person-dialog',
  templateUrl: './create-person-dialog.component.html',
  styleUrls: ['./create-person-dialog.component.scss']
})
export class CreatePersonDialogComponent extends MainComponent implements OnInit {

  personInfos: FormGroup;
  user: Person;

  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;

  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlCiviliteList = environment.api.civiliteList;
  urlPaysList = environment.api.paysList;
  urlAgentEconomique = environment.api.agentEconomique;
  urlNationalite = environment.api.nationalite;
  urlProfessionList = environment.api.professionList;
  urlTypePieceList = environment.api.typePieceList;


  constructor(private formBuilder: FormBuilder, injector: Injector, public dialogRef: MatDialogRef<CreatePersonDialogComponent>) {
    super(injector);
    this.user = new Person();
    this.user.unite = new UniteDTO;
    this.user.civilite = new Parametre;
    this.user.nationalite = new Parametre;
    this.user.paysNaissance = new Parametre;
    this.user.paysResidence = new Parametre;
    this.user.profession = new Parametre;
    this.user.typePiece = new Parametre;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.personInfos = this.formBuilder.group({
      uniteBancaire: ['', Validators.required], code: [],
      civilite: [], nom: [],
      prenom: [], sexe: [],
      nomJeuneFille: [], dateNaissance: [],
      lieuNaissance: [], profession: [],
      paysNaissance: [], nationalite: [],
      paysResidence: [], typePiece: [],
      numPiece: [], lieuDelivrance: [],
      dateDelivrance: [], dateExpiration: [],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSubmit() {
    const formValue = this.personInfos.value;

    this.user.unite.id = formValue.uniteBancaire?.item?.id;
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
    this.user.sexe = formValue.sexe;

    this.customerService.person = this.user;
    this.dialogRef.close();

    this.customerService.person = this.user;
    this.dialogRef.close();

    this.dialogRef.close();

  }

}

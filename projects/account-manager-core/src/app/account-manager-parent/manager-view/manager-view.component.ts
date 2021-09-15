import { ActivatedRoute } from '@angular/router';
import { PouvoirTypeOperation } from 'projects/shared-lib/src/domain/PouvoirTypeOperation';
import { PouvoirTypeCompte } from 'projects/shared-lib/src/domain/PouvoirTypeCompte';
import { MatTableDataSource } from '@angular/material/table';
import { AccountManager } from 'projects/shared-lib/src/domain/AccountManager';
import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { TypeCompteViewComponent } from '../type-compte-view/type-compte-view.component';
import { TypeOperationViewComponent } from '../type-operation-view/type-operation-view.component';
import { AccountManagerService } from '../account-manager.service';

import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { MatSelectionList } from '@angular/material/list';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'microfi-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.scss']
})
export class ManagerViewComponent extends ViewComponent {
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlUtilisateurList = environment.api.utilisateurList;
  urlDeviseList = environment.api.deviseList;
  gestionnaireDetails = new AccountManager();
  gestionnaireCreate: AccountManager = new AccountManager();
  pouvoirTypeCompteListe: PouvoirTypeCompte[] = [];
  pouvoirTypeOperationListe: PouvoirTypeOperation[] = [];
  dataSourceTypeCompte = new MatTableDataSource<any>([]);
  dataSourceTypeOperation = new MatTableDataSource<any>([]);
  typeCompte: any;
  typeOperation: any;
  displayedColumnsTypeCompte: string[] = ['typeCompte', 'montantMaxDeb', 'cumulJour'];
  displayedColumnsTypeOperation: string[] = ['typeOperation', 'montantMaxDeb', 'cumulJour'];

  name: string;
  placeholderCodeBancaire: string;
  placeholderCodeUtilisateur: string;
  placeholderDevise: number;
  //placeholderChips: GestionnaireAutorise[] = [];
  response: any;
  disabled: boolean = false;
  //managerFormViewGroup: FormGroup;
  requestType: RequestType = RequestType.GET;
  enum: string;

  managerFormViewGroup = this.formBuilder.group({
    codeGestionnaire: [],
    codeBancaire: [],
    libelle: [],
    codeUtilisateur: [],
    devise: [],
    decisionnaire: [],
    montantMaxForcage: [],
    plafondDecouvert: [],
    cumulJour: [],
    plafondSbf: [],
    decisonnaire: []
  })
  actualPersonne: any = {
    idCodebancaire: '',
    codeUser: '',
    devise: '',
  }
  isEnabled = true;
  selectedgestionnairesDispo = [];
  selectedAgenceAttribues = [];
  gestionnairesDispo = [];
  gestionnairesAttribues = [];
  constructor(injector: Injector, private accountManagerService: AccountManagerService,
    private formBuilder: FormBuilder, private route: ActivatedRoute) {
    super(injector);

  }

  ngOnInit() {
    this.apiService.get(environment.api.utilisateurList).subscribe((data) => {
      if (data.success) {
        this.gestionnairesDispo = data.returnValue
      }
    })
    super.ngOnInit();
    console.log(this.mode);
    if (this.mode == 1) {
      this.enum = "CREATION";
      this.managerFormViewGroup = this.formBuilder.group({
        codeGestionnaire: [],
        codeBancaire: [],
        libelle: [],
        codeUtilisateur: [],
        devise: [],
        decisionnaire: [],
        montantMaxForcage: [],
        plafondDecouvert: [],
        cumulJour: [],
        plafondSbf: [],
        decisonnaire: []
      })
    }
    if (this.mode == 2) {
      this.enum = "MODIFIER";
      console.log(this.record);
      console.log(this.managerFormViewGroup);
      this.gestionnaireDetails = this.activatedRoute.snapshot.data.Response.returnValue[0];
      console.log(this.gestionnaireDetails);
      this.placeholderCodeBancaire = this.gestionnaireDetails.uniteBancaireDTO.code;
      this.placeholderCodeUtilisateur = this.gestionnaireDetails.codeUtilisateur;
      this.placeholderDevise = this.gestionnaireDetails.deviseDTO.id;
      this.accountManagerService.gestionnaireAutorise = this.gestionnaireDetails.gestionnairesAutorises;

      this.dataSourceTypeCompte.data = this.gestionnaireDetails.pouvoirTypeCompte;
      this.pouvoirTypeCompteListe = this.gestionnaireDetails.pouvoirTypeCompte;

      this.dataSourceTypeOperation.data = this.gestionnaireDetails.pouvoirTypeOperation;
      this.pouvoirTypeOperationListe = this.gestionnaireDetails.pouvoirTypeOperation;
      this.gestionnairesAttribues = this.gestionnaireDetails.gestionnairesAutorises;

      this.managerFormViewGroup.patchValue(
        {
          codeGestionnaire: this.record.code,
          codeBancaire: this.record.uniteBancaireDTO,
          libelle: this.record.nom,
          codeUtilisateur: { code: this.record.codeUtilisateur, libelle: this.record.codeUtilisateur },
          decisonnaire: this.record.decisionnaireON,
          devise: this.record.deviseDTO.devise,
          montantMaxForcage: this.record.montantMaxForcage,
          plafondDecouvert: this.record.plafondDecouvAutorise,
          cumulJour: this.record.montantMaxForcageJour,
          plafondSbf: this.record.montantForcagPlafSBF

        }
      )
      this.managerFormViewGroup.controls['decisonnaire'].setValue(this.record.decisionnaireON, { onlySelf: true });
    }
    if (this.mode == 3) {
      this.enum = "CONSULTER";
      console.log(this.record);
      this.disabled = true;
      this.isEnabled = false;
      this.actualPersonne = {
        idCodebancaire: this.record.uniteBancaireDTO.code,
        codeUser: this.record.codeUtilisateur,
        devise: this.record.deviseDTO.devise.code,
      }
      this.gestionnaireDetails = this.activatedRoute.snapshot.data.Response.returnValue[0];
      this.placeholderCodeBancaire = this.gestionnaireDetails.uniteBancaireDTO.code;
      this.placeholderCodeUtilisateur = this.gestionnaireDetails.codeUtilisateur;
      this.placeholderDevise = this.gestionnaireDetails.uniteBancaireDTO.id;
      this.accountManagerService.gestionnaireAutorise = this.gestionnaireDetails.gestionnairesAutorises;
      this.gestionnairesAttribues = this.gestionnaireDetails.gestionnairesAutorises;
      this.accountManagerService.gestionnaireAutorise = this.gestionnaireDetails.gestionnairesAutorises;

      this.dataSourceTypeCompte.data = this.gestionnaireDetails.pouvoirTypeCompte;
      this.pouvoirTypeCompteListe = this.gestionnaireDetails.pouvoirTypeCompte;

      this.dataSourceTypeOperation.data = this.gestionnaireDetails.pouvoirTypeOperation;
      this.pouvoirTypeOperationListe = this.gestionnaireDetails.pouvoirTypeOperation;
      this.gestionnairesAttribues = this.gestionnaireDetails.gestionnairesAutorises;

      this.managerFormViewGroup.disable();

      this.managerFormViewGroup.patchValue(
        {
          codeGestionnaire: this.record.code,
          codeBancaire: this.record.uniteBancaireDTO,
          libelle: this.record.nom,
          codeUtilisateur: { code: this.record.codeUtilisateur, libelle: this.record.codeUtilisateur },
          decisonnaire: this.record.decisionnaireON,
          devise: this.record.deviseDTO.devise,
          montantMaxForcage: this.record.montantMaxForcage,
          plafondDecouvert: this.record.plafondDecouvAutorise,
          cumulJour: this.record.montantMaxForcageJour,
          plafondSbf: this.record.montantForcagPlafSBF

        }
      )
      this.managerFormViewGroup.controls['decisonnaire'].setValue(this.record.decisionnaireON, { onlySelf: true });

    }
  }

  openDialogTypeCompte() {
    const dialogRef = this.dialog.open(TypeCompteViewComponent, {
      height: '400px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        result.typeCompte = result.typeCompte.item;
        result.cumulJourCourant = result.cumulJour;
        this.typeCompte = result;
        this.dataSourceTypeCompte.data = [...this.dataSourceTypeCompte.data, this.typeCompte];
        this.pouvoirTypeCompteListe.push(this.typeCompte);
      }

    });


  }

  openDialogTypeOperation() {
    const dialogRef = this.dialog.open(TypeOperationViewComponent, {
      height: '400px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        result.typeOperationDTO = result.typeOperation.item;
        this.typeOperation = result;
        this.dataSourceTypeOperation.data = [...this.dataSourceTypeOperation.data, this.typeOperation];
        this.pouvoirTypeOperationListe.push(this.typeOperation);
      }

    });
  }

  parseSelectValue(value: string): string {
    if (value != null) {
      let tabValue = value.split("-");
      if (tabValue.length != 0) {
        return tabValue[0].trim();
      }
    }
  }

  doSave(value) {
    console.log(value);
    this.base = environment.api.accountManagerCreate;
    // this.save();

    var formValue = this.managerFormViewGroup.value;
    var gestionnaire = {
      codeGestionnaire: formValue.codeGestionnaire,
      uniteBancaireDTO: formValue.codeBancaire ? (formValue.codeBancaire.item ? formValue.codeBancaire.item : formValue.codeBancaire) : null,
      nom: formValue.libelle,
      codeUtilisateur: formValue.codeUtilisateur ? (formValue.codeUtilisateur.item ? formValue.codeUtilisateur.item.code : formValue.codeUtilisateur.code) : null,
      decisionnaireON: formValue.decisionnaire,
      deviseDTO: formValue.devise ? (formValue.devise.item ? formValue.devise.item : formValue.devise) : null,
      montantMaxForcage: formValue.montantMaxForcage,
      plafondDecouvAutorise: formValue.plafondDecouvert,
      plafondDecouvAutoriseJour: formValue.plafondDecouvert,
      montantMaxForcageJour: formValue.cumulJour,
      montantForcagPlafSBF: formValue.plafondSbf,
      id: this.gestionnaireDetails?.id,
      code: this.gestionnaireDetails?.code,
      pouvoirTypeCompte: this.pouvoirTypeCompteListe,
      pouvoirTypeOperation: this.pouvoirTypeOperationListe,
      gestionnairesAutorises: this.gestionnairesAttribues
    };
    console.log(gestionnaire);
    // return;
    if (gestionnaire.id) {
      this.apiService.post(environment.api.accountManagerModify, gestionnaire).subscribe((data) => {
        if (data.success) {
          this.alerteDialog("Gestionnaire Modifie");
        }
      })
    } else {
      this.apiService.post(this.base, gestionnaire).subscribe((data) => {
        if (data.success) {
          this.alerteDialog("Gestionnaire cree");
        }
      })
    }


  }
  toggleSelection(type, direction) {
    switch (type) {
      case 'all':
        if (direction == 'right') {
          this.gestionnairesAttribues = this.gestionnairesAttribues.concat(this.gestionnairesDispo);
          this.gestionnairesDispo = [];
        } else {
          this.gestionnairesDispo = this.gestionnairesDispo.concat(this.gestionnairesAttribues);
          this.gestionnairesAttribues = [];
        }
        break;
      case 'selected':
        if (direction == 'right') {
          this.selectedgestionnairesDispo.forEach((element, i) => {

            this.gestionnairesDispo = this.gestionnairesDispo.filter((value) => { return value.code !== element.code });
            this.gestionnairesAttribues.push(Object.assign({}, element));
          })
          this.selectedgestionnairesDispo = [];
        } else {
          this.selectedAgenceAttribues.forEach((element, i) => {
            this.gestionnairesAttribues = this.gestionnairesAttribues.filter((value) => { return value.code !== element.code });
            this.gestionnairesDispo.push(Object.assign({}, element));
          })
          this.selectedAgenceAttribues = [];
        }
        break;

      default:
        break;
    }
  }
  rightChange(event, tag: MatSelectionList) {
    this.selectedAgenceAttribues = tag._value;
  }
  leftChange(event, tag: MatSelectionList) {
    this.selectedgestionnairesDispo = tag._value;
  }
}





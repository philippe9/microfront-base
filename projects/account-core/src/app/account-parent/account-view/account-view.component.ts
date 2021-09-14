import { Component, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { ApiService } from 'projects/shared-lib/src/template/api.service';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';

@Component({
  selector: 'microfi-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent extends ViewComponent {

  requestType: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  formulaire: FormGroup;
  data: any = {}
  createAccountBase: string = environment.api.generateAccountNumber

  optionsGestionnaire: string[] = [];
  filteredOptionsGestionnaire: Observable<string[]>;

  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;

  unite: any;
  agence: any;
  chapitre: any;
  devise: any;
  gestionnaire: any;
  typeCompte: any;
  membre: any;
  produit: any;



  urlMembreList = environment.api.uniteBancaireList;
  urlProduitList = environment.api.urlProduitList;
  urlDeviseList = environment.api.urlDeviseList;
  urlchapitreList = environment.api.urlchapitreList;
  urlconditionArreteList = environment.api.uniteBancaireList;
  defaultCodeUnite = environment.codeUniteBancaire;
  urlGestionnaireList = environment.api.gestionnaireList + environment.idUniteBancaire;
  urltypeCompteList = environment.api.typeCompteList;
  urltypeDateValeurList = environment.api.uniteBancaireList;
  actualPersonne: any = {
    statusMatrimonial: '',
    civilite: '',
    idUnite: '',
    idAgence: '',
    idFormeJuridique: '',
    idProvince: '',
    idDistrict: '',
    paysNaissance: '',
    paysResidence: '',
    idNationalite: '',
    idAgentEconomique: '',
    typePiece2: '',
    idSecteurActivite: '',
    profession: '',
    regimeBiens: '',
    idGestionnaire: '',
    qualite: '',
    categorieInterne: '',
    idUtilisateur: '',
    natureClient: '',
    profilClient: '',
    ville: '',
  }
  idClient = null;
  client: any = {};

  taxable = false;
  report_a_nouveau = false;
  apurable = false;
  isEnabled = true;
  disabled = false;
  ngOnInit() {
    super.ngOnInit();
    this.initForm();
    console.log(this.mode)
    console.log(this.isView)
    console.log("data record", this.record)
    if (this.mode == 1) {
      this.record.countOperation = 0;
      this.record.cumulForcage = 0,
        this.record.dateActivation = new Date;
      this.record.dateApurement = new Date;
      this.record.dateCloture = new Date;
      this.record.dateCreate = new Date;
      this.record.dateDernierCredit = new Date;
      this.record.dateDernierDebit = new Date;
      this.record.dateDerniereOperation = new Date;
      this.record.dateEcheanceDecouvert = new Date;
      this.record.dateFermeture = new Date;
      this.record.dateUpdate = new Date;
      this.record.dateValidationOuverture = new Date;
      this.record.dteDernierArrete = new Date;
      this.record.dteDernierPaiement = new Date;
      this.record.dteFraisActivite = new Date;
      this.record.etatCompte = "InstanceValidation";
      this.record.impAvis = "Non";
      this.record.impCarnet = "Non";
      this.record.impAvis = "Non";
      this.record.impAvis = "Non";
      this.record.impAvis = "Non";
      this.record.instruction = "";
      this.record.lastMontCreditPrevArrete = 0;
      this.record.lastMontDebitPrevArrete = 0;
      this.record.lettrage = "Oui";
      this.record.modeArrete = "Arrete";
      this.record.modeComptabilisation = "ModeDetaiile";
      this.record.montCreditPrevArrete = 0;
      this.record.montDebitPrevArrete = 0;
      this.record.montDebitPrevArrete = 0;
      this.record.montFraisActivite = 0;
      this.record.montantForcageJournalier = 0;
      this.record.montantIndisponible = 0;
      this.record.montantReserve = 0;
      this.record.motifFermeture = 0;
      this.record.reportANouveau = "Oui";
      this.record.reservCollecteId = 0;
      this.record.risque = "Non";
      this.record.sensCompte = "Debit";
      this.record.sensDerniereOperation = "Debit";
      this.record.soldeComptable = 0;
      this.record.soldeInitial = 0;
      this.record.soldeJournalier = 0;
      this.record.soldeSecurise = 0;
      this.record.taxable = "Oui";
      this.record.typeArreteCompte = "None";
      this.record.reservCollecteId = 0;
      this.record.appartenance = "Actif";
      this.record.unite = {};
    }
    if (this.mode != 1) {
      this.unite = this.record.unite;
      this.agence = this.record.agence;
      this.produit = this.record.produit;
      this.gestionnaire = this.record.gestionnaire;
      this.membre = { intituleClient: this.record.client.intituleClient, codePersonne: this.record.client.idClient };
      console.log(this.membre);
      this.idClient = this.record.client.idClient;
      this.typeCompte = this.record.typeCompte;
      this.chapitre = this.record.chapitre;
      this.devise = { code: "", libelle: this.record.devise.code };

    }
    // if (this.mode == 2) {
    //   this.mode
    // }
    if (this.isView) {
      this.isEnabled = false;
      this.disabled = true;
    } else {
      this.isEnabled = true;
      this.disabled = false;
    }


    console.log("data record", this.record)

  }

  constructor(injector: Injector, private api: ApiService) {
    super(injector);
  }

  async initForm() {
    this.formulaire = this.formGroupBuilder.group({
      gestionnaire: ['', Validators.required],
    })
  }

  submit() {
    if (this.mode == 1) {
      this.doSave();
    } else {
      if (this.mode == 5) {
        this.apiService.post(environment.api.doValidateCompte, this.record).subscribe((data) => {
          console.log(data);
          if (data.success) {
            this.alerteDialog('Comte valide');
          }
        })
      } else {
        this.doUpdate();
      }

    }
  }

  doSave() {
    this.record.unite = this.unite ? this.unite.item : null;
    this.record.agence = this.agence ? this.agence.item : null;
    this.record.produit = this.produit ? this.produit.item : null;
    this.record.gestionnaire = this.gestionnaire ? this.gestionnaire.item : null;
    this.record.membre = this.membre ? this.membre.item : null;
    this.record.typeCompte = this.typeCompte ? this.typeCompte.item : null;
    this.record.chapitre = this.chapitre ? this.chapitre.item : null;
    this.record.devise = this.devise ? this.devise.item : null;
    this.record.multiAgence = this.record.multiAgence ? "Oui" : "Non"
    this.record.appurable = this.record.appurable ? "Oui" : "Non"
    // this.membre.item.idClient = this.membre.item.codePersonne;
    this.record.client = this.membre.item;
    this.base = environment.api.createAccount + this.record.multiAgence;
    this.save()
    console.log("the record", this.record)
    console.log("the formulaire", this.formulaire)
  }

  doUpdate() {
    // this.data.cleCompte = this.record.cleCompte;
    this.record.codeAgence = this.record.agence.code;
    this.record.intitulecompte = this.record.intitule;
    this.data.numeroCompte = this.record.numeroCompte;
    console.log(this.unite);
    this.record.unite = this.unite ? (this.unite.item ? this.unite.item : this.unite) : null;
    this.record.uniteBancaire = this.unite ? (this.unite.item ? this.unite.item : this.unite) : null;
    this.record.agence = this.agence ? (this.agence.item ? this.agence.item : this.agence) : null;
    this.record.produit = this.produit ? (this.produit.item ? this.produit.item : this.produit) : null;
    this.record.gestionnaire = this.gestionnaire ? (this.gestionnaire.item ? this.gestionnaire.item : this.gestionnaire) : null;
    this.record.membre = this.membre ? (this.membre.item ? this.membre.item : this.membre) : null;
    this.record.typeCompte = this.typeCompte ? (this.typeCompte.item ? this.typeCompte.item : this.typeCompte) : null;
    this.record.chapitre = this.chapitre ? (this.chapitre.item ? this.chapitre.item : this.chapitre) : null;
    this.record.devise = this.devise ? (this.devise.item ? this.devise.item : this.devise) : null;
    this.record.multiAgence = this.record.multiAgence ? "Oui" : "Non"
    this.record.appurable = this.record.appurable ? "Oui" : "Non"
    this.record.userUpdate = 'ROOT';
    // this.record.intitulecompte = this.record.intitule;
    console.log("the console", this.record);
    // return;
    this.base = environment.api.updateAccount;
    this.api.create(this.base, this.record).subscribe(
      response => {
        console.log("the console", response)
        if (response.success) {
          this.router.navigateByUrl("/account")
        } else {
          console.log("Error message", this.record)
        }
      }, error => {
        this.isSavingRecord = false;
      }
    )
  }

  getCompte() {
    if (this.unite != null) {
      this.data.unite = this.unite.item
    }
    if (this.agence != null) {
      this.data.agence = this.agence.item
    }
    // this.client.id = this.membre
    if (this.membre.item != null) {
      this.data.client = this.membre.item;
      this.data.client.id = this.membre.item.idClient;
      this.data.client.code = this.membre.item.idClient;
    }

    if (this.typeCompte != null) {
      this.data.typeCompte = this.typeCompte.item
    }
    if (this.produit != null) {
      this.data.produit = this.produit.item
    }
    if (this.devise != null) {
      this.data.devise = this.devise.item
    }
    if (this.chapitre != null) {
      this.data.chapitre = this.chapitre.item
    }
    console.log("This.data", this.data)
    console.log("This.record", this.record)
    this.dogetCompte();
  }

  protected dogetCompte() {
    this.isSavingRecord = true;
    this.apiService.create(this.createAccountBase, this.data).subscribe(
      response => {
        this.isSavingRecord = false;
        console.log("response", response)
        if (response.success) {
          this.record.numeroCompte = response.returnValue[0];
          this.record.cleCompte = response.returnValue[1];
        } else {
          console.log("Error message", response)
        }
      }, error1 => {
        this.isSavingRecord = false;
        console.log("Error message222", this.record)
      }
    )
  }


}

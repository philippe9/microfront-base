import { HttpClient } from '@angular/common/http';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { CreatePersonDialogComponent } from '../create-person-dialog/create-person-dialog.component';
// import { ViewComponent } from '../../../template/view/view.component';
import { ViewComponent } from '../../../../../shared-lib/src/template/view/view.component';
import { Person } from '../../../../../shared-lib/src/domain/person';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { PhysicalPerson } from '../../../../../shared-lib/src/domain/PhysicalPerson';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';

@Component({
  selector: 'microfi-physical-person-view',
  templateUrl: './physical-person-view.component.html',
  styleUrls: ['./physical-person-view.component.scss']
})
export class PhysicalPersonViewComponent extends ViewComponent {

  user: any;
  physicalPersonForm: FormGroup = this.formGroupBuilder.group({
    uniteBancaire: [], code: [], sexe: ['', Validators.required], nom: ['', Validators.required],
    dateNaissance: ['', Validators.required], lieuNaissance: ['', Validators.required], nomJeuneFille: [],
    nomPere: [], nomMere: [], tuteur: [],
    agence: [], civilite: ['', Validators.required], prenom: [], nbreEnfant: [],
    dateAdhesion: [], montPart: [], montFondSol: [],
    prenomPere: [], prenomMere: [], numRccm: [],
    adresse1: [], tel1: [], email: [],
    adresse2: [], tel2: [], numFax: [],
    adresse3: [], tel3: [], adresse4: [],
    nomPersContacter: [], telPersContacter: [], adressePersContacter: [],
    gestionnaire: ['', Validators.required], famille: [], qualite: [],
    catInterne: ['', Validators.required], utilAssocie: [], groupe: [],
    nature: [], profil: ['', Validators.required],
    ville: [], paysOrigine: ['', Validators.required], nationalite: ['', Validators.required],
    numIdentite: ['', Validators.required], lieuDelivrance: ['', Validators.required],
    profession: ['', Validators.required], statutMat: [],
    revenu: [], paysResidence: ['', Validators.required], typePiece: ['', Validators.required],
    dateDelivrance: ['', Validators.required], dateExpire: ['', Validators.required],
    secteurAct: ['', Validators.required], regimeBien: [],
    employeur: [], idClient: []

  });
  clientCode: string;
  tuteur: Person;
  isOptional = true;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;

  optionsGestionnaire: string[] = [];
  optionsGroupeClient: string[] = [];
  optionsFamilleClient: string[] = [];

  filteredOptionsGestionnaire: Observable<string[]>;
  filteredOptionsGroupeClient: Observable<string[]>;
  filteredOptionsFamilleClient: Observable<string[]>;

  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlFormeJuridiqueList = environment.api.formeJuridiqueList;
  urlPaysList = environment.api.paysList;
  urlSecteurActivite = environment.api.secteurActivite;
  urlAgentEconomique = environment.api.agentEconomique;
  urlNationalite = environment.api.nationalite;
  urlProvince = environment.api.provinceList;
  urlDistrictList = environment.api.districtList;
  urlTypePieceList = environment.api.typePieceList;
  urlRegimeBienList = environment.api.regimeBienList;
  urlQualiteList = environment.api.qualiteList;
  urlVilleList = environment.api.villeList;
  urlCategorieInterneList = environment.api.categorieInterneList;
  urlUtilisateurList = environment.api.utilisateurList;
  urlProfilClientList = environment.api.profilClientList;
  urlCiviliteList = environment.api.civiliteList;
  urlProfessionList = environment.api.professionList;
  urlStatutMatrimoniale = environment.api.statutMatrimoniale;
  urlPlageRevenue = environment.api.plageRevenue;
  urlNatureClientList = environment.api.natureClientList;
  defaultCodeUnite = environment.codeUniteBancaire;
  urlGestionnaireList = environment.api.gestionnaireList + environment.idUniteBancaire;
  actualPersonne: any = {
    statusMatrimonial: '',
    civilite: '',
    idUnite: '',
    idAgence: '',
    paysNaissance: '',
    paysResidence: '',
    idNationalite: '',
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
  isEnabled = true;
  constructor(injector: Injector) {
    super(injector);
    this.user = new PhysicalPerson();
    this.requestType = RequestType.GET;
    this.tuteur = new Person();
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.physicalPersonForm.controls['dateAdhesion'].disable();
    this.physicalPersonForm.controls['code'].disable();
    this.searchUrl = environment.api.physicalCustomerPage;
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(params);
        this.mode = params.mode;
        if (this.mode != 1) {
        }
        console.log(this.mode)

        this.isView = params.mode == Dialog.CONSULTATION;
        console.log(this.isView);
        if (this.isView) {
          this.physicalPersonForm.disable();
          this.isEnabled = false;

        }
        this.clientCode = params.code;
        if (this.clientCode !== null && this.clientCode !== undefined) {
          super.builSearchCriterias();
          this.searchCriteria.max = 1;
          this.searchCriteria.first = 0;
          this.equal["code"] = this.clientCode;
          this.alias["personne"] = "personne";
          this.searchCriteria.equal = this.equal;
          this.searchCriteria.alias = this.alias;
          this.apiService.post(environment.api.physicalCustomerPage, this.searchCriteria).subscribe((data) => {
            console.log('------------------------------------------------------------');
            console.log(data);
            if (data.success && data.returnValue.length > 0) {
              this.initForm(data.returnValue[0]);
            }
          })
        }
      });


    // await this.initForm();

  }

  initForm(personne) {

    // this.physicalPersonForm.setValue({ 'code': personne.codePersonne, 'uniteBancaire':'' });
    this.actualPersonne = personne;
    this.physicalPersonForm.controls['code'].setValue(personne.codePersonne);

    this.physicalPersonForm.controls['sexe'].setValue(personne.personne.sexe);
    this.physicalPersonForm.controls['uniteBancaire'].setValue(personne.personne.unite);
    this.physicalPersonForm.controls['numRccm'].setValue(personne.personne.numeroContribuable);
    this.physicalPersonForm.controls['nom'].setValue(personne.personne.nom);
    this.physicalPersonForm.controls['prenom'].setValue(personne.personne.prenom);
    this.physicalPersonForm.controls['lieuNaissance'].setValue(personne.personne.lieuNaissance);
    this.physicalPersonForm.controls['civilite'].setValue(personne.personne.civilite);
    this.physicalPersonForm.controls['nomJeuneFille'].setValue(personne.personne.nomJeuneFille);
    this.physicalPersonForm.controls['nomPere'].setValue(personne.nomDuPere);
    this.physicalPersonForm.controls['nomMere'].setValue(personne.nomMere);
    this.physicalPersonForm.controls['prenomPere'].setValue(personne.prenomDuPere);
    this.physicalPersonForm.controls['prenomMere'].setValue(personne.prenomMere);
    this.physicalPersonForm.controls['dateNaissance'].setValue(personne.personne.dateNaissance);
    this.physicalPersonForm.controls['dateAdhesion'].setValue(personne.dateAdhesion);
    this.physicalPersonForm.controls['idClient'].setValue(personne.idClient);
    this.physicalPersonForm.controls['code'].setValue(personne.codePersonne);
    this.physicalPersonForm.controls['agence'].setValue(personne.idAgence);
    this.physicalPersonForm.controls['nature'].setValue(personne.nature);
    this.physicalPersonForm.controls['profil'].setValue(personne.profil);
    this.physicalPersonForm.controls['adresse1'].setValue(personne.adresse1);
    this.physicalPersonForm.controls['adresse2'].setValue(personne.adresse2);
    this.physicalPersonForm.controls['adresse3'].setValue(personne.adresse3);
    this.physicalPersonForm.controls['adresse4'].setValue(personne.adresse4);
    this.physicalPersonForm.controls['nbreEnfant'].setValue(personne.nbrEnfant);
    this.physicalPersonForm.controls['montPart'].setValue(personne.montantPart);
    this.physicalPersonForm.controls['montFondSol'].setValue(personne.montantFond);

    this.physicalPersonForm.controls['tel1'].setValue(personne.telephone1);
    this.physicalPersonForm.controls['tel2'].setValue(personne.telephone2);
    this.physicalPersonForm.controls['tel3'].setValue(personne.telephone3);
    this.physicalPersonForm.controls['numFax'].setValue(personne.faxNumber);
    this.physicalPersonForm.controls['email'].setValue(personne.emailclient);
    this.physicalPersonForm.controls['nomPersContacter'].setValue(personne.nomPersonneAContacter);
    this.physicalPersonForm.controls['telPersContacter'].setValue(personne.telephonePersonneAContacter);
    this.physicalPersonForm.controls['adressePersContacter'].setValue(personne.bpPersonneAContacter);
    this.physicalPersonForm.controls['employeur'].setValue(personne.employeur);
    this.physicalPersonForm.controls['revenu'].setValue(personne.plageRevenu);
    this.physicalPersonForm.controls['qualite'].setValue(personne.qualite);
    this.physicalPersonForm.controls['nature'].setValue(personne.natureClient);
    this.physicalPersonForm.controls['profil'].setValue(personne.profilClient);
    this.physicalPersonForm.controls['ville'].setValue(personne.ville);
    if (personne.categorieInterne !== null) {
      this.physicalPersonForm.controls['catInterne'].setValue({ code: personne.categorieInterne.codeCategorieInterne, libelle: personne.categorieInterne.intituleCategorieInterne });
    }




    this.physicalPersonForm.controls['paysOrigine'].setValue(personne.personne.paysNaissance);
    this.physicalPersonForm.controls['paysResidence'].setValue(personne.personne.paysResidence);
    this.physicalPersonForm.controls['nationalite'].setValue(personne.personne.nationalite);
    this.physicalPersonForm.controls['typePiece'].setValue(personne.personne.typePiece);
    this.physicalPersonForm.controls['numIdentite'].setValue(personne.personne.numeroPieceIdentite);
    this.physicalPersonForm.controls['lieuDelivrance'].setValue(personne.personne.lieuDelivrancePiece);
    this.physicalPersonForm.controls['dateDelivrance'].setValue(personne.personne.dateDelivrancePiece);
    this.physicalPersonForm.controls['dateExpire'].setValue(personne.personne.dateExpirationPiece);
    this.physicalPersonForm.controls['profession'].setValue(personne.personne.profession);

    this.physicalPersonForm.controls['secteurAct'].setValue(personne.secteurAct);
    this.physicalPersonForm.controls['employeur'].setValue(personne.employeur);
    this.physicalPersonForm.controls['statutMat'].setValue(personne.statutMat);
    this.physicalPersonForm.controls['regimeBien'].setValue(personne.regimeBiens);
    this.physicalPersonForm.controls['revenu'].setValue(personne.revenu);

    this.physicalPersonForm.controls['gestionnaire'].setValue(personne.gestionnaire);
    this.physicalPersonForm.controls['famille'].setValue(personne.famille);
    this.physicalPersonForm.controls['qualite'].setValue(personne.qualite);
    this.physicalPersonForm.controls['catInterne'].setValue(personne.catInterne);
    this.physicalPersonForm.controls['utilAssocie'].setValue(personne.utilAssocie);
    this.physicalPersonForm.controls['groupe'].setValue(personne.groupe);
    this.physicalPersonForm.controls['profil'].setValue(personne.profil);
    this.physicalPersonForm.controls['ville'].setValue(personne.ville);


    // this.customerService.getGestionnaire().subscribe((data) => {
    //   data.returnValue.forEach((item) => this.optionsGestionnaire.push(item.code + " - " + item.nom));
    //   this.filteredOptionsGestionnaire = this.physicalPersonForm.get('gestionnaire').valueChanges.pipe(
    //     startWith(''),
    //     map(value => value ? this._filterGestionnaire(value) : this.optionsGestionnaire.slice())
    //   );

    // });

    this.customerService.getGroupeClient().subscribe((data) => {
      data.returnValue.forEach((item) => this.optionsGroupeClient.push(item.code + " - " + item.nom));

      this.filteredOptionsGroupeClient = this.physicalPersonForm.get('groupe').valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filterGroupeClient(value) : this.optionsGroupeClient.slice())
      );


    });

    this.customerService.getFamilleClient().subscribe((data) => {
      data.returnValue.forEach((item) => this.optionsFamilleClient.push(item.code + " - " + item.nom));
      this.filteredOptionsFamilleClient = this.physicalPersonForm.get('famille').valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filterFamilleClient(value) : this.optionsFamilleClient.slice())
      );
    });


    this.customerService.getGestionnaire().subscribe((data) => {
      data.returnValue.forEach((item) => this.optionsGestionnaire.push(item.code + " - " + item.nom));
      this.filteredOptionsGestionnaire = this.physicalPersonForm.get('gestionnaire').valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filterGestionnaire(value) : this.optionsGestionnaire.slice())
      );
    });

    this.customerService.getGroupeClient().subscribe((data) => {
      data.returnValue.forEach((item) => this.optionsGroupeClient.push(item.code + " - " + item.nom));
      this.filteredOptionsGroupeClient = this.physicalPersonForm.get('groupe').valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filterGroupeClient(value) : this.optionsGroupeClient.slice())
      );
    });

    this.customerService.getFamilleClient().subscribe((data) => {
      data.returnValue.forEach((item) => this.optionsFamilleClient.push(item.code + " - " + item.nom));
      this.filteredOptionsFamilleClient = this.physicalPersonForm.get('famille').valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filterFamilleClient(value) : this.optionsFamilleClient.slice())
      );
    });


  }

  private _filterGestionnaire(value): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsGestionnaire.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterFamilleClient(value): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsFamilleClient.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterGroupeClient(value): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsGroupeClient.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  openDialogCreatePerson() {
    const dialogRef = this.dialog.open(CreatePersonDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.customerService.person);
      this.tuteur = this.customerService.person;
    });
  }

  submitForm() {
    const formValue = this.physicalPersonForm.value;
    console.log(formValue);
    this.user.idUnite = formValue.uniteBancaire?.item?.code;
    this.user.idPaysNaissance = formValue.paysOrigine?.item?.code;
    this.user.paysNaissance = formValue.paysOrigine?.item;
    this.user.paysResidence = formValue.paysResidence?.item;
    this.user.idAgence = formValue.agence?.item?.code;
    this.user.idSecteurActivite = formValue.secteurAct?.item?.code;
    this.user.idQualite = formValue.qualite?.item?.code;
    this.user.qualite = formValue.qualite?.item;
    this.user.idCategorieInterne = formValue.catInterne?.item?.code;
    this.user.categorieInterne = formValue.catInterne?.item;
    this.user.idUtilisateur = formValue.utilAssocie?.item?.code;
    this.user.idProfilClient = formValue.profil?.item?.code;
    this.user.profilClient = formValue.profil?.item;
    this.user.idVille = formValue.ville?.item?.code;
    this.user.ville = formValue.ville?.item;
    this.user.idCivilite = formValue.civilite?.item?.code;
    this.user.idNationalite = formValue.nationalite?.item?.code;
    this.user.nationalite = formValue.nationalite?.item;
    this.user.typePiece2 = formValue.typePiece?.item;
    this.user.idProfession = formValue.profession?.item?.code;
    this.user.idStatutMatrimonial = formValue.statutMat?.item?.code;
    this.user.idPlageRevenu = formValue.revenu?.item?.code;
    this.user.idRegimeBiens = formValue.regimeBien?.item?.code;
    this.user.intituleClient = formValue.nom + ' ' + formValue.prenom;
    this.user.nomCli2 = formValue.nom2;
    this.user.idProvince = null;
    this.user.idDistrict = null;
    this.user.adresse4 = formValue.adresse4;
    this.user.postalCode = formValue.codePostal;
    this.user.faxNumber = formValue.numFax;
    this.user.idNatureClient = formValue.nature?.id;
    this.user.natureClient = formValue.nature;
    this.user.idAgentEconomique = null;
    this.user.idCategorieBanqueCentrale = null;
    this.user.modeCompta = null;
    this.user.idFamilleClients = formValue.famille;
    this.user.idGroupeClients = formValue.groupe;
    this.user.idGestionnaire = formValue.gestionnaire?.item?.id;
    this.user.adresse1 = formValue.adresse1;
    this.user.adresse2 = formValue.adresse2;
    this.user.adresse3 = formValue.adresse3;
    this.user.telephone1 = formValue.tel1;
    this.user.telephone2 = formValue.tel2;
    this.user.telephone3 = formValue.tel3;
    this.user.emailclient = formValue.email;
    this.user.dosJuriIncomplet = null;
    this.user.taxable = null;
    this.user.idProvince = null;
    this.user.valide = null;
    this.user.douteux = null;
    this.user.dteDouteux = null;
    this.user.dteLevDouteux = null;
    this.user.nonResident = null;
    this.user.interditChequier = null;
    this.user.nbValidation = null;
    this.user.dateAdhesion = null;
    this.user.montantPart = formValue.montPart;
    this.user.nombrePart = null;
    this.user.montantFond = formValue.montFondSol;
    this.user.nombreEnfant = null;
    this.user.idUtilisateur = "ROOT";
    this.user.loginUserConnected = "ROOT";

    this.user.nom = formValue.nom;
    this.user.nomJeuneFille = formValue.nomJeuneFille;
    this.user.prenom = formValue.prenom;
    this.user.sexe = formValue.sexe;
    this.user.dateNaissance = formValue.dateNaissance;
    this.user.lieuNaissance = formValue.lieuNaissance;
    this.user.numeroContribuable = formValue.numRccm;
    this.user.numeroPieceIdentite = formValue.numIdentite;
    this.user.dateDelivrancePiece = formValue.dateDelivrance;
    this.user.lieuDelivrancePiece = formValue.lieuDelivrance;
    this.user.dateExpirationPiece = formValue.dateExpire;
    this.user.nomDuPere = formValue.nomPere;
    this.user.prenomDuPere = formValue.prenomPere;
    this.user.nomMere = formValue.nomMere;
    this.user.prenomMere = formValue.prenomMere;
    this.user.nomPersonneAContacter = formValue.nomPersContacter;
    this.user.telephonePersonneAContacter = formValue.telPersContacter;
    this.user.bpPersonneAContacter = formValue.adressePersContacter;
    this.user.numeroJugementHeredite = null;
    this.user.employeur = formValue.employeur;
    this.user.nomCli3 = null;
    this.user.idTypePiece2 = null;
    this.user.numPiece2 = null;
    this.user.dateDelivrancePiece2 = null;
    this.user.lieuDelivrancePiece2 = null;
    this.user.dateExpirationPiece2 = null;
    this.user.securityNum = null;
    this.user.drivLicNum = null;
    this.user.healthInsNum = null;
    this.user.nbrEnfant = null;
    this.user.idHouseType = null;
    this.user.yearDurAddr = null;
    this.user.monthDurAddr = null;
    this.user.addrEmployeur = null;
    this.user.idVilEmployeur = null;
    this.user.idPaysEmployeur = null;
    this.user.yearEmplDur = null;
    this.user.monthEmplDur = null;
    this.user.incomeFrequency = null;
    this.user.idPersonne = null;
    /**------------------------------------------------------------- */
    this.user.idTuteur = null;
    this.user.idDescendantList = null;
    this.user.idHeritierList = null;
    this.user.idConjointList = null;
    this.user.idAdministrateurBienList = null;
    this.user.idCategorieBanqueCentrale = null;
    this.user.idFamilleClients = null;
    this.user.idPlageRevenu = null;
    this.user.idStatutMatrimonial = null;
    this.user.idRegimeBiens = null;

    console.log(this.user);
    console.log(this.physicalPersonForm.valid);

    if (this.physicalPersonForm.value.idClient === null) {
      this.customerService.postPhysicCustomer(this.user).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.alerteDialog('Client créée avec success');
          this.physicalPersonForm.reset();

        } else {
          this.alerteDialog("Une erreur est subvenue");
        }

      });
    } else {
      this.user.idClient = this.physicalPersonForm.value.idClient;
      this.user.code = this.physicalPersonForm.value.code;
      this.apiService.post(environment.api.updatePersonne, this.user).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.alerteDialog('Client mis a jour');
          this.physicalPersonForm.reset();
        } else {
          this.alerteDialog("Une erreur est subvenue");
        }
      })
    }
  }
  reset(stepper: MatStepper) {
    stepper.reset();
  }

}

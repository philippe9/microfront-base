import { Component, Injector, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';
import { CreatePersonDialogComponent } from '../create-person-dialog/create-person-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MoralShareholderDialogComponent } from '../moral-shareholder-dialog/moral-shareholder-dialog.component';
import { PhysicShareholderDialogComponent } from '../physic-shareholder-dialog/physic-shareholder-dialog.component';
import { ViewComponent } from '../../../../../shared-lib/src/template/view/view.component';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { PeriodicElementDirigeants } from '../../../../../shared-lib/src/domain/periodic-element-dirigeants';
import { PeriodicelementActionnaires } from '../../../../../shared-lib/src/domain/periodicelement-actionnaires';
import { MoralPerson } from 'projects/shared-lib/src/domain/MoralPerson';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';


/* const DATA_DIRIGEANTS = new MatTableDataSource<PeriodicElementDirigeants>([]);

const DATA_ACTIONNAIRES = new MatTableDataSource<PeriodicelementActionnaires>([]); */

@Component({
  selector: 'microfi-moral-person-view',
  templateUrl: './moral-person-view.component.html',
  styleUrls: ['./moral-person-view.component.scss']
})
export class MoralPersonViewComponent extends ViewComponent {

  @Input() uniteBancaire: string;
  optionsGestionnaire: string[] = [];
  optionsGroupeClient: string[] = [];
  optionsFamilleClient: string[] = [];
  filteredOptionsGestionnaire: Observable<string[]>;
  filteredOptionsGroupeClient: Observable<string[]>;
  filteredOptionsFamilleClient: Observable<string[]>;

  userDetail1: FormGroup = this.formGroupBuilder.group({
    uniteBance: ['', Validators.required],
    agence: [],
    code: [],
    raisonSociale: ['', Validators.required],
    dateCreation: ['', Validators.required],
    capital: ['', Validators.compose([
      Validators.required, this.nonZero])],
    siege: ['', Validators.required],
    numRccm: ['', Validators.required],
    autDelivRccm: [],
    dateDeliv: ['', Validators.required],
    formeJuridique: ['', Validators.required],
    lieuDelivRccm: ['', Validators.required],
    chiffeAffaireHt: [], dateAdhesion: [],
    pays: ['', Validators.required],
    nationalite: ['', Validators.required],
    secteurActivite: ['', Validators.required], agentEco: [],
    montPart: [], montFondSol: [],
    adresse1: [], tel1: [], email: [], adresse2: [], tel2: [],
    numFax: [], adresse3: [], tel3: [], adresse4: [],
    numContribuable: [], numStatut: [], numRecepice: ['', Validators.required],
    numPatente: ['', Validators.required], numTax: [], nom2: [], dateEnregStatut: [], codePostal: [],
    dateDelivRecepice: ['', Validators.required], autDelivRecepice: ['', Validators.required],
    dateValiditePate: ['', Validators.required],
    dateFermeture: [], numTva: [], gestionnaire: ['', Validators.required], famille: [],
    qualite: [], catInterne: ['', Validators.required], utilAssocie: [], groupe: [],
    nature: [], profil: ['', Validators.required], ville: [], province: [],
    typeEntreprise: [], district: [], statut: [], natureClient: [], idClient: [], idUnite: [], idAgence: []
  });
  user: any;
  isOptional = true;

  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlFormeJuridiqueList = environment.api.formeJuridiqueList;
  urlPaysList = environment.api.paysList;
  urlSecteurActivite = environment.api.secteurActivite;
  urlAgentEconomique = environment.api.agentEconomique;
  urlNationalite = environment.api.nationalite;
  urlProvince = environment.api.provinceList;
  urlDistrictList = environment.api.districtList;
  urlTypeEntrepriseList = environment.api.typeEntrepriseList;
  urlStatutEntrepriseList = environment.api.statutEntrepriseList;
  defaultCodeUnite = environment.codeUniteBancaire;
  urlGestionnaireList = environment.api.gestionnaireList + environment.idUniteBancaire;
  urlGroupeClientList = environment.api.groupeClientList;
  urlFamilleClientList = environment.api.familleClientList;
  urlNatureClientList = environment.api.natureClientList;
  urlQualiteList = environment.api.qualiteList;
  urlVilleList = environment.api.villeList;
  urlCategorieInterneList = environment.api.categorieInterneList;
  urlUtilisateurList = environment.api.utilisateurList;
  urlProfilClientList = environment.api.profilClientList;
  requestType2 = RequestType.POST;
  requestType = RequestType.GET;

  displayedColumnsDirigeants: string[] = ['code', 'nom', 'prenom', 'sexe', 'actions'];
  //dataSourceDirigeants = new MatTableDataSource<PeriodicElementDirigeants>(this.customerService.person);

  //dataSourceDirigeants = DATA_DIRIGEANTS;
  dataSourceDirigeants = new MatTableDataSource<PeriodicElementDirigeants>([]);

  displayedColumnsActionnaires: string[] = ['nature', 'est_membre', 'designation', 'pourcentage_action', 'actions'];

  dataSourceActionnaires = new MatTableDataSource<any>([]);
  actionnaire: PeriodicelementActionnaires;
  clientCode: string;


  filteredOptions: Observable<string[]>;
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
  isEnabled = true;
  onSubmit() {
    console.log("hddlmlmsqflqfl");
  }

  constructor(injector: Injector) {
    super(injector);
    this.user = new MoralPerson();
    this.base = this.environment.module.moral;
    this.requestType = RequestType.GET;
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.searchUrl = environment.api.moralCustomerList;
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(params);
        this.mode = params.mode;
        this.isView = params.mode == Dialog.CONSULTATION;
        console.log(this.isView);
        if (this.isView) {
          this.userDetail1.disable();
          this.isEnabled = false;

        }
        this.clientCode = params.code;
        if (this.clientCode !== null && this.clientCode !== undefined) {
          super.builSearchCriterias();
          this.searchCriteria.max = 1;
          this.searchCriteria.first = 0;
          this.equal["code"] = this.clientCode;
          this.searchCriteria.equal = this.equal;
          this.apiService.post(environment.api.moralCustomerPage, this.searchCriteria).subscribe((data) => {
            console.log('------------------------------------------------------------');
            console.log(data);
            if (data.success) {
              this.initForm(data.returnValue[0]);
            }
          })
        }
      });

  }

  nonZero(control: FormGroup): { [key: string]: any; } {
    if (Number(control.value) <= 0) {
      return { nonZero: true };
    } else {
      return null;
    }
  }


  async initForm(personne) {
    this.actualPersonne = personne;

    this.userDetail1.controls['idClient'].setValue(personne.idClient);
    this.userDetail1.controls['code'].setValue(personne.idClient);
    this.userDetail1.controls['idAgence'].setValue(personne.idAgence);
    this.userDetail1.controls['idUnite'].setValue(personne.idUnite);
    this.userDetail1.controls['uniteBance'].setValue(personne.idUnite);
    this.userDetail1.controls['raisonSociale'].setValue(personne.raisonSociale);
    this.userDetail1.controls['dateCreation'].setValue(personne.dateDeCreation);
    this.userDetail1.controls['dateDeliv'].setValue(personne.dateDelivReecep);
    this.userDetail1.controls['capital'].setValue(personne.capital);
    this.userDetail1.controls['siege'].setValue(personne.siege);
    this.userDetail1.controls['numRccm'].setValue(personne.registreDeCommerce);
    this.userDetail1.controls['dateEnregStatut'].setValue(personne.dateEnregistrement);
    this.userDetail1.controls['autDelivRccm'].setValue(personne.autoriteDelivRccm);
    this.userDetail1.controls['chiffeAffaireHt'].setValue(personne.chiffreAffaireHT);
    this.userDetail1.controls['dateAdhesion'].setValue(personne.dateAdhesion);
    this.userDetail1.controls['pays'].setValue(personne.idPays);
    this.userDetail1.controls['nationalite'].setValue(personne.idNationalite);
    this.userDetail1.controls['secteurActivite'].setValue(personne.idSecteurActivite);
    this.userDetail1.controls['agentEco'].setValue(personne.idAgentEconomique);
    this.userDetail1.controls['montPart'].setValue(personne.montantFond);
    this.userDetail1.controls['montFondSol'].setValue(personne.montantPart);
    this.userDetail1.controls['adresse1'].setValue(personne.adresse1);
    this.userDetail1.controls['adresse2'].setValue(personne.adresse2);
    this.userDetail1.controls['adresse3'].setValue(personne.adresse3);
    this.userDetail1.controls['adresse4'].setValue(personne.adresse4);
    this.userDetail1.controls['montFondSol'].setValue(personne.montantPart);
    this.userDetail1.controls['tel1'].setValue(personne.telephone1);
    this.userDetail1.controls['tel2'].setValue(personne.telephone2);
    this.userDetail1.controls['tel3'].setValue(personne.telephone3);
    this.userDetail1.controls['email'].setValue(personne.emailclient);
    this.userDetail1.controls['numContribuable'].setValue(personne.numeroContribuable);
    this.userDetail1.controls['numStatut'].setValue(personne.numeroStatut);
    this.userDetail1.controls['numRecepice'].setValue(personne.numeroRecepisseDeclaration);
    this.userDetail1.controls['numPatente'].setValue(personne.numeroPatente);
    this.userDetail1.controls['numTax'].setValue(personne.tax_Tpin_Num);
    this.userDetail1.controls['codePostal'].setValue(personne.bpNotaire);
    // this.userDetail1.controls['dateDelivReecep'].setValue(personne.dateDelivReecep);
    this.userDetail1.controls['autDelivRecepice'].setValue(personne.autoriteDelivranceRecpisse);
    this.userDetail1.controls['dateValiditePate'].setValue(personne.dateValiditePatente);
    // this.userDetail1.controls['dateFermeture'].setValue(personne.autoriteDelivranceRecpisse);
    this.userDetail1.controls['numTva'].setValue(personne.autoriteDelivranceRecpisse);
    this.userDetail1.controls['autDelivRecepice'].setValue(personne.autoriteDelivranceRecpisse);
    this.userDetail1.controls['gestionnaire'].setValue(personne.gestionnaire);
    this.userDetail1.controls['famille'].setValue(personne.famille);
    this.userDetail1.controls['qualite'].setValue(personne.qualite);
    this.userDetail1.controls['catInterne'].setValue(personne.catInterne);
    this.userDetail1.controls['utilAssocie'].setValue(personne.utilAssocie);
    this.userDetail1.controls['groupe'].setValue(personne.groupe);
    this.userDetail1.controls['profil'].setValue(personne.profil);
    this.userDetail1.controls['ville'].setValue(personne.ville);


    this.customerService.getGroupeClient().subscribe((data) => {
      data.returnValue.forEach((item) => this.optionsGroupeClient.push(item.code + " - " + item.nom));

      this.filteredOptionsGroupeClient = this.userDetail1.get('groupe').valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filterGroupeClient(value) : this.optionsGroupeClient.slice())
      );

    });

    this.customerService.getFamilleClient().subscribe((data) => {
      data.returnValue.forEach((item) => this.optionsFamilleClient.push(item.code + " - " + item.nom));

      this.filteredOptionsFamilleClient = this.userDetail1.get('famille').valueChanges.pipe(
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


  openDialogAddPerson() {
    const dialogRef = this.dialog.open(AddPersonDialogComponent);
    let isExist = false;
    dialogRef.afterClosed().subscribe((result: PeriodicElementDirigeants[]) => {
      console.log(this.customerService.person);
      if (this.dataSourceDirigeants.data.length == 0) {
        if (this.customerService.person != undefined) {
          this.dataSourceDirigeants.data = [...this.dataSourceDirigeants.data, this.customerService.person];
        }

      } else {
        if (this.customerService.person != undefined) {
          for (const item of this.dataSourceDirigeants.data) {
            if (item.code == this.customerService.person.code) {
              isExist = true;
            }
          }
        }

        if (!isExist) {
          this.dataSourceDirigeants.data = [...this.dataSourceDirigeants.data, this.customerService.person];
        }
      }

      console.log(this.dataSourceDirigeants.data);
    });
  }

  handleDeleteDirigeant(value) {
    console.log(value);
    for (const item of this.dataSourceDirigeants.data) {
      if (item.code == value.code) {
        console.log(this.dataSourceDirigeants.data.indexOf(item, 0));
        this.dataSourceDirigeants.data.splice(this.dataSourceDirigeants.data.indexOf(item, 0), 1);
        this.dataSourceDirigeants.data = this.dataSourceDirigeants.data;
      }
    }
    console.log(this.dataSourceDirigeants.data);
  }

  handleDeleteActionnaire(value) {
    console.log(value);
    for (const item of this.dataSourceActionnaires.data) {
      if (item.code == value.code) {
        console.log(this.dataSourceActionnaires.data.indexOf(item, 0));
        this.dataSourceActionnaires.data.splice(this.dataSourceActionnaires.data.indexOf(item, 0), 1);
        this.dataSourceActionnaires.data = this.dataSourceActionnaires.data;
      }
    }
    console.log(this.dataSourceActionnaires.data);
  }

  openDialogCreatePerson() {
    const dialogRef = this.dialog.open(CreatePersonDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.customerService.person);
      this.dataSourceDirigeants.data = [...this.dataSourceDirigeants.data, this.customerService.person];
    });
  }

  openDialogCreateActionnairePerson() {
    const dialogRef = this.dialog.open(PhysicShareholderDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.actionnaire = result;
      console.log(this.actionnaire);
      if (this.actionnaire !== '') {
        this.dataSourceActionnaires.data = [...this.dataSourceActionnaires.data, this.actionnaire];
      }


    });
  }

  openDialogCreateActionnaireMorale() {
    const dialogRef = this.dialog.open(MoralShareholderDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.actionnaire = result;
      console.log(this.actionnaire);
      if (this.actionnaire !== '') {
        this.dataSourceActionnaires.data = [...this.dataSourceActionnaires.data, this.actionnaire];
      }
    });
  }

  parseSelectValue(value): string {
    if (value != null) {
      let tabValue = value.split("-");
      if (tabValue.length != 0) {
        return tabValue[0].trim();
      }
    }
  }


  submitForm() {
    console.log("**************subimt**************");
    const formValue = this.userDetail1.value;
    console.log(formValue);
    this.user.intituleClient = formValue.raisonSociale;
    this.user.nomCli2 = formValue.nom2;
    this.user.adresse4 = formValue.adresse4;
    this.user.postalCode = formValue.codePostal;
    this.user.faxNumber = formValue.numFax;
    this.user.idNatureClient = formValue.nature;
    this.user.idCategorieBanqueCentrale = null;
    this.user.modeCompta = null;
    this.user.idFamilleClients = formValue.famille;
    this.user.idGroupeClients = formValue.groupe;
    this.user.idGestionnaire = formValue.gestionnaire?.item?.code;
    this.user.adresse1 = formValue.adresse1;
    this.user.adresse2 = formValue.adresse2;
    this.user.adresse3 = formValue.adresse3;
    this.user.telephone1 = formValue.tel1;
    this.user.telephone2 = formValue.tel2;
    this.user.telephone3 = formValue.tel3;
    this.user.emailclient = formValue.email;
    this.user.dosJuriIncomplet = null;
    this.user.taxable = null;
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
    this.user.raisonSociale = formValue.raisonSociale;
    this.user.numeroStatut = formValue.numStatut;
    this.user.dateEnregistrement = formValue.dateEnregStatut;
    this.user.notaire = null;
    this.user.telephoneNotaire = null;
    this.user.capital = formValue.capital;
    this.user.chiffreAffaireHT = formValue.chiffeAffaireHt;
    this.user.bpNotaire = null;
    this.user.numEnreg = null;
    this.user.dateDeCreation = this.dateFormatter(formValue.dateCreation).split('-').reverse().join('-');
    this.user.registreDeCommerce = formValue.numRccm;
    this.user.autoriteDelivRccm = formValue.autDelivRccm;
    this.user.lieuEtablissementRccm = formValue.lieuDelivRccm;
    this.user.dateEtablissementRccm = this.dateFormatter(formValue.dateDeliv).split('-').reverse().join('-');
    this.user.numeroContribuable = formValue.numContribuable;
    this.user.numeroPatente = formValue.numPatente;
    this.user.dateValiditePatente = formValue.dateValiditePate;
    this.user.numeroRecepisseDeclaration = formValue.numRecepice;
    this.user.dateDelivReecep = formValue.dateDelivRecepice;
    this.user.lieuDelivranceRecepisse = null;
    this.user.autoriteDelivranceRecpisse = formValue.autDelivRecepice;
    this.user.siege = formValue.siege;
    this.user.tvaNumber = formValue.numTva;
    this.user.ceaseDate = null;
    this.user.idDirigeantList = null;
    this.user.idActionnairesList = null;
    this.user.idClientsList = null;
    this.user.idFournisseursList = null;
    this.user.idFormeJuridique = formValue.formeJuridique?.item?.id;
    this.user.idQualite = formValue.qualite?.item?.code;
    this.user.qualite = formValue.qualite?.item;
    this.user.profilClient = formValue.profil?.item;
    this.user.categorieInterne = formValue.catInterne?.item;
    this.user.secteurActivite = formValue.secteurActivite?.item;
    this.user.ville = formValue.ville?.item;
    this.user.pays = formValue.pays?.item;
    this.user.idPays = formValue.pays?.item?.code;
    this.user.nationalite = formValue.nationalite?.item;
    this.user.natureClient = formValue.natureClient?.item;
    this.user.nature = formValue.nature;
    this.user.idAgence = formValue.idAgence;
    this.user.idUnite = formValue.idUnite;

    console.log(this.user);
    console.log(this.userDetail1.valid);
    if (formValue.idClient === null) {
      this.customerService.postMoralCustomer(this.user).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.alerteDialog("Client morale cree avec success");
          this.userDetail1.reset();
        } else {
          this.alerteDialog("Une erreur est subvenue");
        }

      });

    } else {
      this.user.idClient = formValue.idClient;
      // this.user.code = formValue.value.code;
      this.apiService.post(environment.api.updateClientMorale, this.user).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.alerteDialog("Client morale mis a jour avec success");
          this.userDetail1.reset();
        } else {
          this.alerteDialog("Une erreur est subvenue");
        }
      });


    }


  }
}

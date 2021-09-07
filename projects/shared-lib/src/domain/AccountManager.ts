import {DeviseDto} from "./DeviseDTO";
import {GestionnaireAutorise} from "./GestionnaireAutorise";
import {PouvoirTypeCompte} from "./PouvoirTypeCompte";
import {PouvoirTypeOperation} from "./PouvoirTypeOperation";
import {UniteBancaireDto} from "./UniteBancaireDto";

export class AccountManager {
  id?: number;
  code?: string;
  nom?: string;
  decisionnaireON?: string;
  montantMaxForcage?: number;
  montantMaxForcageJour?: number;
  montantMaxForcageJourCourant?: number;
  montantForcagPlafSBF?: number;
  montantForcagPlafSBFJour?: number;
  plafondDecouvAutorise?: number;
  plafondDecouvAutoriseJour?: number;
  uniteBancaireDTO? = new UniteBancaireDto();
  deviseDTO? = new DeviseDto();
  codeUtilisateur?: string;
  gestionnairesAutorises?: GestionnaireAutorise[];
  pouvoirTypeCompte?: PouvoirTypeCompte[];
  pouvoirTypeOperation?: PouvoirTypeOperation[];

  constructor() {
    this.id = null;
    this.code = null;
    this.nom = null;
    this.decisionnaireON = null;
    this.montantMaxForcage = null;
    this.montantMaxForcageJour = null;
    this.montantMaxForcageJourCourant = null;
    this.montantForcagPlafSBF = null;
    this.montantForcagPlafSBFJour = null;
    this.plafondDecouvAutorise = null;
    this.plafondDecouvAutoriseJour = null;
    this.codeUtilisateur = null;
    this.gestionnairesAutorises = null;
    this.pouvoirTypeCompte = null;
    this.pouvoirTypeOperation = null;


  }


}

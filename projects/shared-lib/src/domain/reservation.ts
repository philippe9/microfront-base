import { Branch } from "./Branch";
import { Compte } from "./compte";
import { UniteBancaireDto } from "./UniteBancaireDto";

export class Reservation {
  id?: number;
  unite: UniteBancaireDto;
  agence: Branch;
  compte: Compte;
  code: string;
  montantReser: number;
  montantLev: number;
  enCours: string;
  nanti: string;
  agios: string;
  alaDemande: string;
  system: string;
  dteLeve: string;
  commentaire: string;
  eveOpposition: number;
  eveLeve: number;
  interne: string;
}

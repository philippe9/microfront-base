import {Parametre} from "./Parametre";
import {UniteDTO} from "./UniteDTO";

export class Person {
  civilite: Parametre;
  code: string;
  dateDelivrancePiece: string;
  dateExpirationPiece: string;
  dateNaissance: string;
  id: number;
  lieuDelivrancePiece: string;
  lieuNaissance: string;
  nationalite: Parametre;
  nom: string;
  nomJeuneFille: string;
  numeroContribuable: string;
  numeroPieceIdentite: string;
  paysNaissance: Parametre;
  paysResidence: Parametre;
  prenom: string;
  profession: Parametre;
  sexe: string;
  typePiece: Parametre;
  unite: UniteDTO;
}

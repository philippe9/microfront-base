export class PouvoirTypeCompte {
  cumulJour: number;
  cumulJourCourant: number;
  id: number;
  montantMaxDebit: number;
  typeCompte: {
    code: string;
    id: number;
    libelle: string;
  }
}

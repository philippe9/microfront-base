export class DailyCollectionArrete {
    id?: number;
	  collecteur?: string;
	  compte?: string ;
	  montant?: number;
	  dateFin?: Date;
      dateArrete?: Date;
      dateDebut?: Date;
	  fraisFixe?: number;
      montantTaxeFraisFixe?: number;
      tauxVariable?: number;
      fraisVariable?: number;
      montantTaxeFraisVariable?: number;
	  compteFraisFixe? : string;
      compteFraisVariable? : string;
      taxeFraisFixe? : string;
      taxeFraisVariable? : string;
}
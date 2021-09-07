import { Branch } from "./Branch";
import { CompteDTO } from "./CompteDTO";
import { LeveeReservationDTO } from "./LeveeReservationDTO";
import { UniteBancaireDto } from "./UniteBancaireDto";

export class ReservationDTO {

    id?: number;
    unite? = new UniteBancaireDto();
    agence? = new Branch();
    compte? = new CompteDTO();
    code?: string;
    montantReser?: number;
    montantLev?: number;
    enCours?: string;
    nanti?: string;
    agios?: string;
    alaDemande?: string;
    system?: string;
    dteLeve?: string;
    commentaire?: string;
    eveOpposition?: number;
    eveLeve?: number;
    interne?: string;
    levees? = new Array<LeveeReservationDTO>();

}
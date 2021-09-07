import { Branch } from "./Branch";
import { CompteDTO } from "./CompteDTO";
import { TypeOppositionDTOmin } from "./TypeOppositionDTOmin";
import { UniteDTO } from "./UniteDTO";

export class OppositionCompteDTO{
    id?: number;
    code?: string;
    unite?: UniteDTO;
    agence?: Branch;
    typeOpposition?: TypeOppositionDTOmin;
    motif?: string;
    alaDemande?: string;
    dateOpposition?: string;
    motifLevee?: string;
    isLevee?: string;
    dateLevee?: string;
    compte?: CompteDTO;
    utiCre?: string;
    utiMod?: string;
}
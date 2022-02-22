export interface Credentials {
  object: UtilisateurDTO;
  message: string;
  refreshExpiresIn: number;
  tokenExpiresIn: number;
  token_type: string;
}

export class UtilisateurDTO {
  profil: ProfilDTO;
  niveauForcage: string;
  code: string;
  nom: string;
  login: string;
  defaultPassword: string;
  niveau: string;
  codeGroupe: string;
  codeFiliale: string;
  codeSuccursale: string;
  codeBranche: string;
  multiUnite: string;
  listeObjet: string;
  suspendu: string;
  dteFinSuspension: string;
  dteModPasse: string;
  langue: string;
  maxConnect: string;
  tentative: string;
  tentativeOTP: string;
  temporaire: string;
  tempDteDebut: string;
  tempDteFin: string;
  dateValidite: string;
  root: string;
  champLibre1: string;
  champLibre2: string;
  champLibre3: string;
  telephone: string;
  mail: string;
  sessionDTOs: Array<ProfilDTO>;
  profils: Array<ProfilDTO>;
}
export class ProfilDTO {
  code: string;
  nom: string;
  desc: string;
  niveau: string;
  codeObjet: string;
}

export class SessionDTO {
  sessionId: number;
  adresseIp: number;
  dateDebut: number;
}

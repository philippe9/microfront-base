export class GestionnaireDto {
  id: number;
  libelle: string;

  constructor(id: number, libelle: string) {
    this.id = id;
    this.libelle = libelle;
  }
}

export class DeathClient {
    agence: {
        id: number;
        version: number;
        code: string;
    };
    client:{
        id: number;
        code: string;
        libelle: string;
    };
    commentaire?: string;
    dateDeces?: Date;
    dateValid?: Date;
    id?: number;
    utiValid?: string;
}
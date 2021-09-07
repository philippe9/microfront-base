export class SearchParam {

  uniteId?: number;
  codeUnite?: string;
  codeAgence?: string;
  code?: string;
  etat?: string;
  first?: number;
  max?: number;
  alias?: IHash = {};
  like?: IHash = {};
  equal?: IHash = {};
}

export interface IHash {
  [details: string]: any;
}

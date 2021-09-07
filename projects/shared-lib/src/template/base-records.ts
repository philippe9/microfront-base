import {BaseRecord} from "./base-record";

export interface BaseRecords<T> extends BaseRecord<T>{
  records?:T [];
  totalPages?:number;
  totalElements?:number;
}

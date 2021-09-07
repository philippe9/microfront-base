import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CustomerService } from '../service/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { IHash, SearchParam } from 'projects/shared-lib/src/domain/SearchParam';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';

const DATA_PERSON: PeriodicElementPerson[] = [];

@Component({
  selector: 'microfi-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {

  displayedColumnsPerson: string[] = ['code', 'nom', 'prenom', 'sexe', 'actions'];
  dataSourcePerson: any;
  param: SearchParam;
  searchDetails: FormGroup;

  urlFindPersonne = environment.api.findPersonne;

  constructor(public dialogRef: MatDialogRef<AddPersonDialogComponent>, private formBuilder: FormBuilder, private http: HttpClient, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.searchDetails = this.formBuilder.group({
      code: [''],
      nom: [''],
      prenom: [''],
    });
    this.param = new SearchParam();
  }

  find() {

    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    equal["code"] = this.searchDetails.value.code;
    like["nom"] = this.searchDetails.value.nom;
    like["prenom"] = this.searchDetails.value.prenom;

    this.param.equal = equal;
    this.param.like = like;
    this.param.alias = alias;


    this.customerService.findPerson(this.param).subscribe((data) => {
      console.log(data.returnValue);
      this.dataSourcePerson = new MatTableDataSource<PeriodicElementPerson>(data.returnValue);
    });

  }

  @Output()
  objectSelected: EventEmitter<string> = new EventEmitter<string>();

  /* valueChanged(evt: any) {
    if (evt.source.selected) {
      console.log(evt);
      this.valueChange.emit(evt.source.value);
    }

  } */

  handleSelection(value) {
    console.log(value);
    this.customerService.person = value;
    this.dialogRef.close();
  }

}


export interface PeriodicElementPerson {
  code: string;
  nom: string;
  prenom: string;
  sexe: string;
}

import { AccountManagerService } from './../account-manager.service';
import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GestionnaireAutorise } from 'projects/shared-lib/src/domain/GestionnaireAutorise';
import { GestionnaireDto } from 'projects/shared-lib/src/domain/GestionnaireDto';

@Component({
  selector: 'microfi-add-chips',
  templateUrl: './add-chips.component.html',
  styleUrls: ['./add-chips.component.scss']
})
export class AddChipsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = this.formBuilder.group({
    elementSelected: []
  }
  );
  filteredItems: Observable<string[]>;
  items: string[] = [];
  gestionnaireList: GestionnaireAutorise[];
  gestionnaireAutoriseList: string[] = [];
  gestionnaireAutoriseList2: string[] = [];
  gestionnaireTotalList: GestionnaireDto[];


  @Input() enum: any;

  @ViewChild('elementInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  valueChanged(evt: any) {
    if (evt.source.selected) {
      console.log(evt);
      console.log(evt.source.selected);
      console.log(evt.source.value);
      this.valueChange.emit(evt.source.value);
    }

  }

  constructor(private formBuilder: FormBuilder, private accountManagerService: AccountManagerService) {
  }


  ngOnInit(): void {

    if (this.enum == 3) {
      this.gestionnaireList = this.accountManagerService.gestionnaireAutorise;
      for (let element of this.gestionnaireList) {
        this.gestionnaireAutoriseList.push(element.code + ' - ' + element.libelle);
      }
      this.itemCtrl.disable();
      this.itemCtrl.patchValue(
        {
          elementSelected: this.gestionnaireAutoriseList,
        }
      );
      for (let element of this.gestionnaireAutoriseList) {
        this.items.push(element);
      }
      this.filteredItems = this.itemCtrl.get('elementSelected').valueChanges.pipe(
        startWith(null),
        map((elementSelected: string | null) => elementSelected ? this._filter(elementSelected) : this.gestionnaireAutoriseList.slice()));


    }

    if (this.enum == 2) {
      this.gestionnaireTotalList = this.accountManagerService.gestionnaireAutoriseTotal;
      for (let element of this.gestionnaireTotalList) {
        this.gestionnaireAutoriseList2.push(element.libelle);
      }
      console.log(this.gestionnaireAutoriseList2);
      this.itemCtrl.patchValue(
        {
          elementSelected: this.gestionnaireAutoriseList2,
        }
      );

      this.filteredItems = this.itemCtrl.get('elementSelected').valueChanges.pipe(
        startWith(null),
        map((elementSelected: string | null) => elementSelected ? this._filter(elementSelected) : this.gestionnaireAutoriseList2.slice()));


    }

    if (this.enum == 1) {
      this.gestionnaireTotalList = this.accountManagerService.gestionnaireAutoriseTotal;
      for (let element of this.gestionnaireTotalList) {
        this.gestionnaireAutoriseList2.push(element.libelle);
      }
      console.log(this.gestionnaireAutoriseList2);
      this.itemCtrl.patchValue(
        {
          elementSelected: this.gestionnaireAutoriseList2,
        }
      );

      this.filteredItems = this.itemCtrl.get('elementSelected').valueChanges.pipe(
        startWith(null),
        map((elementSelected: string | null) => elementSelected ? this._filter(elementSelected) : this.gestionnaireAutoriseList2.slice()));


    }

    /*  this.filteredItems = this.itemCtrl.get('elementSelected').valueChanges.pipe(
         startWith(null),
         map((elementSelected: string | null) => elementSelected ? this._filter(elementSelected) : this.gestionnaireAutoriseList2.slice()));
  */

    /*  if(this.enum==="CREATION"){
       await this.initForm();

       await this.initForm();
       //console.log(this.options);
       this.filteredOptions = this.genericSelect.get('generic').valueChanges.pipe(
         startWith(''),
         map(value => value ? this._filter(value) : this.options.slice())
       ); */


  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.items.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.itemCtrl.setValue(null);
  }

  remove(elementSelected: string): void {
    const index = this.items.indexOf(elementSelected);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.items.includes(event.option.viewValue)) {
      this.items.push(event.option.viewValue);
      this.itemInput.nativeElement.value = '';
      this.itemCtrl.get('elementSelected').setValue(null);

    } else if (this.items.includes(event.option.viewValue)) {
      this.itemInput.nativeElement.value = '';
      this.itemCtrl.get('elementSelected').setValue(null);
    }

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.enum == 2 || this.enum == 1) {
      return this.gestionnaireAutoriseList2.filter(elementSelected => elementSelected.toLowerCase().indexOf(filterValue) === 0);
    }
    if (this.enum == 3)
      return this.gestionnaireAutoriseList.filter(elementSelected => elementSelected.toLowerCase().indexOf(filterValue) === 0);
  }

}


import { Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgModel, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MainComponent } from '../main/main.component';
import { IHash } from '../../domain/SearchParam';
import { Subscription } from 'rxjs';


@Component({
  selector: 'microfi-select-customer-form',
  templateUrl: './select-customer-form.component.html',
  styleUrls: ['./select-customer-form.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectCustomerFormComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SelectCustomerFormComponent), multi: true }
  ],
})
export class SelectCustomerFormComponent extends MainComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  protected records: any[];
  public data: any = {};
  @Input() type: string
  @Input() codeClient: string = null;
  @Input() disable: boolean = false;
  public criterial: string;
  @Input() lable: string = "Membre";
  @Input() enable?: boolean = true;
  @Input() defaultValue?: any;

  selectAutoComplete: FormGroup;
  subscriptions: Subscription[] = [];

  @Output()
  eventSelection: EventEmitter<string> = new EventEmitter<string>();

  /** control for the selected record */
  public recordCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public recordFilterCtrl: FormControl = new FormControl();

  /** list of records filtered by search keyword */
  public filteredRecords: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  customers = [];
  constructor(injector: Injector, private formBuilder: FormBuilder,) {
    super(injector);

    this.base = this.environment.module.AccountListComponent;
    this.selectAutoComplete = this.formBuilder.group({
      item: [''],
    });
  }


  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  set value(value: any) {
    this.selectAutoComplete.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get value(): any {
    console.log("passing here")
    return this.selectAutoComplete.value;
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    console.log("passing here")
    if (value) {
      // this.value = value;
    }

    if (value === null) {
      this.selectAutoComplete.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.selectAutoComplete.valid ? null : { libelle: { valid: false, }, };
  }

  reset() {
    this.selectAutoComplete.reset();
  }

  ngOnInit() {
    // set initial selection
    // this.recordCtrl.setValue(this.records[10]);

    // // load the initial record list
    // this.filteredRecords.next(this.records.slice());

    // listen for search field value changes
    this.recordFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRecords();
      });
    this.subscriptions.push(
      this.selectAutoComplete.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
    if (!this.enable) {
      this.selectAutoComplete.disable()
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',this.defaultValue);
    if (this.defaultValue !== null && this.defaultValue !== null && this.defaultValue !== undefined && this.defaultValue !== '') {
      // var value = this.customers.filter(option => option.codePersonne == this.defaultValue);
      // console.log(this.defaultValue);
      // console.log(value);
      // console.log(this.customers);
      // this.codeClient = this.defaultValue.codePersonne;
      // this.selectAutoComplete.controls['defaultValue'].setValue(this.defaultValue);
      // this.customers.push(this.defaultValue);
      // this.recordFilterCtrl.setValue(this.defaultValue);

      // // this.recordFilterCtrl.setValue(this.defaultValue);
      // this.dofind(this.defaultValue.codePersonne);

    }
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredRecords are loaded initially
   */
  protected setInitialValue() {
    this.filteredRecords
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredRecords are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  protected filterRecords() {
    if (!this.records) {
      console.log("tttttttest00", this.records)
      return;
    }
    let search = this.recordFilterCtrl.value;
    if (!search) {
      this.filteredRecords.next(this.records.slice());
      this.eventSelection.emit(this.selectAutoComplete.value);
      console.log("tttttttest02", this.records)
      return this.selectAutoComplete.value;
    } else {
      search = search.toLowerCase();
      console.log("tttttttest03", this.records)
    }
    // filter the records
    this.filteredRecords.next(
      this.records.filter(record => record.libelle.toLowerCase().indexOf(search) > -1)
    );
  }
  emitSelection(event: any) {
    // console.log(event);
    // console.log(event.value);
    this.eventSelection.emit(event.source.value);
  }
  dosearch() {
    console.log("testing", this.criterial)
    if (this.criterial != "  " && this.criterial.length > 1) {
      this.dofind(this.criterial);
    }
  }

  dofind(crit: string) {
    super.builSearchCriterias();
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    if (this.codeClient != null) {
      alias["client"] = "client";
      console.log("loggggggggggg")
      this.searchCriteria.equal = equal;
      this.searchCriteria.alias = alias;
      equal["client.code"] = this.selectAutoComplete.value.item.code;
    }
    this.searchCriteria.first = 0;
    this.searchCriteria.max = 15;
    this.searchUrl = this.environment.api.doFindClientPost;
    console.log("Entered searchCriteria", this.searchCriteria)
    this.apiService.post(this.searchUrl, this.searchCriteria)
      .subscribe(response => {
        console.log("Entered message", response)
        if (response.success) {
          this.filteredRecords = response.returnValue;
          this.customers = response.returnValue;

          console.log("Entered records", this.records)
        } error => {
          console.log("Error message", response.record)
        }
      });
  }

}


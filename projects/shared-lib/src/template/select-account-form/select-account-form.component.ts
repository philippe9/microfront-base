import { Component, EventEmitter, forwardRef, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgModel, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MainComponent } from '../main/main.component';
import { IHash } from '../../domain/SearchParam';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { AlerteDialogComponent } from '../alerte-dialog/alerte-dialog.component';
import { AdossageComponent } from '../../template/adossage/adossage.component';

export interface RecordAccount {
  acc1: string,
  acc2: string,
  acc3: string,
  acc4: string
}

export interface range {
  from: string,
  to: string
}

@Component({
  selector: 'microfi-select-account-form',
  templateUrl: './select-account-form.component.html',
  styleUrls: ['./select-account-form.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectAccountFormComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SelectAccountFormComponent), multi: true }
  ],
})
export class SelectAccountFormComponent extends MainComponent implements ControlValueAccessor, OnInit {

  protected records: any[];
  public data: any = {};
  @Input() type: string
  @Input() chapitreFilters: string;
  @Input() produitFilters: string;
  @Input() adossage: boolean;
  @Input() checkOpposition: boolean;

  @Input() client: any;
  @Input() disable: boolean = true;
  @Input() lable: string = "Compte";
  @Input() urlCompte: string;
  @Input() defaultValue?: any;

  @Input()
  prop: any;
  public criterial: string;
  selectAutoComplete: FormGroup;
  subscriptions: Subscription[] = [];
  @Output()
  eventSelection: EventEmitter<string> = new EventEmitter<string>();
  eventOppositionCode: EventEmitter<string> = new EventEmitter<string>();

  /** control for the selected record */
  public recordCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public recordFilterCtrl: FormControl = new FormControl();

  /** list of records filtered by search keyword */
  public filteredRecords: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  doOppositionAccounttPage = environment.api.doOppositionAccounttPage;


  constructor(injector: Injector, private formBuilder: FormBuilder,) {
    super(injector);
    this.base = this.environment.module.AccountListComponent;
    this.selectAutoComplete = this.formBuilder.group({
      item: ['']
    });
    console.log("url", this.urlCompte)
  }
  // ngOnChanges(changes: SimpleChanges): void {
  // console.log("this.disabledisable",this.disable)
  // console.log("this.clientthis.client",this.lable)
  // if(this.client!=null){
  //   this.disable=false
  //   this.records= [];
  //   this.selectAutoComplete.reset()
  //   this.dofind("");
  // }else{
  //   // this.disable=true
  // }
  // console.log("disable",this.disable)
  // return
  // }


  setDisabledState?(isDisabled: boolean): void {

  }

  set value(value: any) {
    this.selectAutoComplete.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get value(): any {
    return
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      // this.value = value;
    }

    if (value === null) {
      this.selectAutoComplete.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
    console.log("onTouched")
  }

  validate(_: FormControl) {
    return this.selectAutoComplete.valid ? null : { libelle: { valid: false, }, };
  }

  reset() {
    this.selectAutoComplete.reset();
  }

  ngOnInit() {
    console.log("url", this.urlCompte)
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
  }

  // ngAfterViewInit() {
  //   this.setInitialValue();
  // }

  // ngOnDestroy() {
  //   this._onDestroy.next();
  //   this._onDestroy.complete();
  // }



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
      return;
    }
    let search = this.recordFilterCtrl.value;
    if (!search) {
      if (this.checkOpposition) {
        return this.doCheckOpposition();
      }
      if (this.adossage) {
        return this.openAdossageDialog();
      }
      this.filteredRecords.next(this.records.slice());
      this.eventSelection.emit(this.selectAutoComplete.value);
      return this.selectAutoComplete.value;
    } else {
      search = search.toLowerCase();
    }
    // filter the records
    this.filteredRecords.next(
      this.records.filter(record => record.numeroCompte.indexOf(search) > -1)
    );
  }

  dosearch() {
    if (this.criterial != null && this.criterial.length > 1) {
      this.dofind(this.criterial);
    }
  }

  dofind(crit: string) {
    super.builSearchCriterias();
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    if (this.client != null) {
      alias["client"] = "client";
      this.searchCriteria.equal = equal;
      this.searchCriteria.alias = alias;
      equal["client.code"] = this.client.code;
    }
    // if(crit!=null){
    //   this.searchCriteria.like = like;
    //   this.searchCriteria.alias = alias;
    //   alias["client"] = "client";
    //   like["client.libelle"] = crit;
    //   like["intitule"] = crit;
    //   like["numeroCompte"] = crit;
    //   like["membre.code"] = crit;
    // }
    if (this.chapitreFilters != null) {
      alias["chapitre"] = "chapitre";
      this.searchCriteria.equal = equal;
      this.searchCriteria.alias = alias;
      equal["chapitre.code"] = this.chapitreFilters;
    }
    if (this.produitFilters != null) {
      alias["produit"] = "produit";
      this.searchCriteria.equal = equal;
      this.searchCriteria.alias = alias;
      equal["produit.code"] = this.produitFilters;
    }
    this.searchCriteria.first = 0;
    this.searchCriteria.max = 20;
    this.searchUrl = this.environment.api.accountPage;
    console.log("response", this.searchCriteria)
    this.apiService.post(this.urlCompte != null ? this.urlCompte : this.searchUrl, this.searchCriteria)
      .subscribe(response => {
        console.log("response", response)
        if (response.success) {
          this.records = response.returnValue;
          this.updateItem();
          this.filterRecords();
        } error => {
          console.log("Error message", response.record)
        }
      });
  }



  doCheckOpposition() {
    if (this.selectAutoComplete.value != null) {
      let equal: IHash = {};
      this.searchCriteria = {};
      equal["code"] = this.selectAutoComplete.value.item.client.code;
      this.searchCriteria.equal = equal;
      this.logger.info(this.searchCriteria);
      this.searchCriteria.first = this.firstIndex;
      this.searchCriteria.max = this.itemsPerPage;
      this.apiService.post(this.doOppositionAccounttPage, this.searchCriteria)
        .subscribe((response) => {
          if (response.success && response.returnValue.length > 0 && response.returnValue[0].bloquant) {
            return this.alerteDialog("Compte en opposition");
          } else if (response.success && response.returnValue.length == 0) {
            if (response.returnValue.length > 0 && !response.returnValue[0].bloquant) {
              this.eventOppositionCode.emit(response.returnValue[0].codeOpposition);
            }
            if (this.adossage) {
              return this.openAdossageDialog();
            }
            this.filteredRecords.next(this.records.slice());
            this.eventSelection.emit(this.selectAutoComplete.value);
            this.onChange(this.selectAutoComplete.value);
            return this.selectAutoComplete.value;
          }
        }, error => {
          this.openError(error.message)
        })
    }
  }

  animal: string;
  name: string;
  alerteDialog(message: string): void {
    const dialogRef = this.dialog.open(AlerteDialogComponent, {
      width: '250px',
      data: message,
    });

    dialogRef.afterClosed().subscribe(result => {
      let value: any = {}
      value.item = {};
      value.item.client = {};
      this.onChange(value);
      this.setInitialValue();
      return this.value;
    });
  }

  openAdossageDialog(): void {
    const dialogRef = this.dialog.open(AdossageComponent, {
      width: '90vw',
      data: this.selectAutoComplete.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "OUI" || result == "oui" || result == "Oui" || result == "YES" || result == "yes" || result == "Yes") {
        this.filteredRecords.next(this.records.slice());
        this.eventSelection.emit(this.selectAutoComplete.value);
        this.onChange(this.selectAutoComplete.value);
        return this.selectAutoComplete.value;
      } else {
        this.filteredRecords.next(
          this.records.filter(record => record.numeroCompte.indexOf("tesing") > -1)
        );
        this.selectAutoComplete = this.formBuilder.group({
          item: ['']
        });
        let value: any = {}
        value.item = {};
        value.item.client = {};
        this.onChange(value);
        this.setInitialValue();
        return this.value;
      }
    });
  }

  updateItem() {
    if (this.defaultValue !== null && this.defaultValue !== null && this.defaultValue !== undefined && this.defaultValue !== '') {
      var value = this.records.filter(option => option.code == this.defaultValue);
      console.log(this.records);
      console.log(this.defaultValue);
      console.log(value);
      this.selectAutoComplete.controls['item'].setValue(value[0]);
    }
  }
}


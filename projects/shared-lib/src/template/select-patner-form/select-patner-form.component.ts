import { HttpClient } from '@angular/common/http';
import { EventEmitter, Component, Injector, Input, OnInit, Output, ViewChild, SimpleChange, OnChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'microfi-select-patner-form',
  templateUrl: './select-patner-form.component.html',
  styleUrls: ['./select-patner-form.component.scss']
})
export class SelectPatnerFormComponent extends MainComponent implements ControlValueAccessor, OnInit {
  protected records: any[];
  // public data: any = {};
  @Input() disable: boolean = false;
  public criterial: string;
  @Input() lable: string;
  selectAutoComplete: FormGroup;
  subscriptions: Subscription[] = [];
  nbPages: number = 1;
  currentPage: number = 0;
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


  constructor(injector: Injector, private formBuilder: FormBuilder, private httpc: HttpClient) {
    super(injector);

    this.base = this.environment.module.AccountListComponent;
    this.selectAutoComplete = this.formBuilder.group({
      item: ['']
    });
  }
  // /caisse/findPartenaire/{codeUnite}/{code}/{libelle}/{firstResult}/{maxResult}

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
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  protected filterRecords() {
    if (!this.records) {
      return;
    }
    let search = this.recordFilterCtrl.value;
    if (!search) {
      this.filteredRecords.next(this.records.slice());
      this.eventSelection.emit(this.selectAutoComplete.value);
      return this.selectAutoComplete.value;
    } else {
      search = search.toLowerCase();
    }
    // filter the records
    this.filteredRecords.next(
      this.records.filter(record => record.libelle.toLowerCase().indexOf(search) > -1)
    );
  }

  dosearch() {
    if (this.currentPage < this.nbPages) {
      this.dofind();
    }
  }

  dofind() {
    this.searchUrl = this.environment.api.dofindPartenaire;
    this.httpc.get(this.searchUrl)
      .subscribe((response: any) => {
        if (response.success) {
          console.log('response:', response);
          this.records = response.returnValue;
          this.nbPages = response.nbPages;
          this.currentPage += 1
        } error => {
        }
      });
  }
}

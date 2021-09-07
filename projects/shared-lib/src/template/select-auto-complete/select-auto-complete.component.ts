import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Parametre } from '../../domain/parametre';
import { RequestType } from '../../domain/request-type.enum';

@Component({
  selector: 'microfi-select-auto-complete',
  template: `
    <form [formGroup]="selectAutoComplete" class="first-section">
       <mat-form-field >
         <mat-label>{{libelle}}</mat-label>
         <input formControlName="item"  #stateInput required
          type="text" matInput [matAutocomplete]="auto">
          <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete" [displayWith]="getOptionText">
            <mat-option
            (onSelectionChange)="stateInput.value !=undefined;emitSelection($event)"
            *ngFor="let option of filteredOptions | async" [value]="option">
              {{option.code + " - " + (option.libelle ? option.libelle : option.nom )}}
            </mat-option>
          </mat-autocomplete>
       </mat-form-field>
    </form>
  `,
  styles: [`
         mat-form-field{width: 100%; }
         mat-form-field {
          width: 100%;
          font-size: 13px;
      }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAutoCompleteComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectAutoCompleteComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectAutoCompleteComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {

  subscriptions: Subscription[] = [];
  selectAutoComplete: FormGroup;
  selectAutoFormControl: FormControl;
  @Input() url: string;
  @Input() requestType: RequestType;
  @Input() libelle: string;
  @Input() data?: any;
  @Input() agence?: any;
  @Input() postParams?: any;
  @Input() defaultValue?: any;
  @Input() devise?: any;
  @Input() enable?: boolean = true;
  filteredOptions: Observable<Parametre[]>;
  options: Parametre[] = [];
  @Output() onSelectAutoComplete = new EventEmitter();
  findParam = {
    "uniteId": environment.idUniteBancaire,
    "code": null,
    "first": 0,
    "max": -1
  };


  _filter(value): Parametre[] {
    console.log(value)
    if (value.item !== '' && value.item !== undefined && value.item !== null) {
      if (value.item.hasOwnProperty("code")) {
        return this.options.filter(option => option.code == value.item.code);
      } else {
        const filterValue = value.item.toLowerCase();
        return this.options.filter(option => option.code.toLowerCase().indexOf(filterValue) >= 0 || (option.hasOwnProperty("nom") ? option.nom.toLowerCase().indexOf(filterValue) >= 0 : option.libelle.toLowerCase().indexOf(filterValue) >= 0));
      }
    }

  }

  get value(): any {
    return this.selectAutoComplete.value;
  }

  getOptionText(option) {
    return option == null || option == "" ? "" : option.code + " - " + (option.hasOwnProperty("nom") ? option.nom : option.libelle);
  }

  set value(value: any) {
    console.log(value);
    if (value != null) {
      this.selectAutoComplete.patchValue({ item: value });
      //  this.selectAutoComplete.setValue(value);
      this.onChange(value);
      this.onTouched();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) {
    this.selectAutoComplete = this.formBuilder.group({
      item: ['']
    });

    this.subscriptions.push(
      this.selectAutoComplete.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );

    this.selectAutoFormControl = this.formBuilder.control('');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("devise", this.devise);
    console.log("agence", this.agence);
    console.log("data", this.data);
    console.log("enable", this.enable);
    if (this.agence != undefined && this.devise != undefined) {
      this.url = this.url + this.agence.item.code + "/" + this.devise.item.code;
      console.log(this.url);
    }

    if (this.requestType == RequestType.GET && this.agence != undefined && this.devise != undefined) {
      this.http.get(environment.baseApiUrl + this.url)
        .toPromise()
        .then((res: any) => {
          if (res.success) {
            res.returnValue.forEach((item) => this.options.push(item));
            this.updateItem();

          }

        })
        .catch();
    }
    if (!this.enable) {
      this.selectAutoComplete.disable()
    }
    console.log(this.defaultValue);
    if (this.defaultValue !== null && this.defaultValue !== null && this.defaultValue !== undefined && this.defaultValue !== '') {
      var value = this.options.filter(option => option.code == this.defaultValue);
      console.log(this.options);
      console.log(this.defaultValue);
      console.log(value);
      this.selectAutoComplete.controls['item'].setValue(value[0]);
    }
  }

  async ngOnInit(): Promise<void> {
    console.log('link', this.requestType);
    console.log('link', this.url);
    await this.buildForm();
    if (!this.enable) {
      this.selectAutoComplete.disable()
    }
    this.filteredOptions = this.selectAutoComplete.valueChanges.pipe(
      startWith(''),
      map(value => value ? this._filter(value) : this.options.slice())
    );
  }

  buildForm() {

    if (this.requestType == RequestType.GET) {

      this.http.get((this.data) ? this.url + "/" + this.data : this.url)
        .toPromise()
        .then((res: any) => {
          res.returnValue.forEach((item) => this.options.push(item));
          this.updateItem();
        })
        .catch();
    } else if (this.requestType == RequestType.POST) {
      if (this.postParams !== null && this.postParams !== undefined) {
        this.findParam = this.postParams;
      }
      this.http.post(this.url, this.findParam).toPromise()
        .then((res: any) => {
          console.log(res);
          res.returnValue.forEach((item) => this.options.push(item));
          console.log(this.options);
          this.updateItem();

        })
        .catch();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = (value) => {

    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwww")
    console.log("Received value :", value);
  };
  onTouched: any = () => {
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwww")
  };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwww")
      this.value = value;
    }

    if (value === null) {
      this.selectAutoComplete.reset();
    }
    console.log(value);
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
  emitSelection(event: any) {
    this.onSelectAutoComplete.emit(event.source.value);
  }
  updateItem() {
    if (this.defaultValue !== null && this.defaultValue !== null && this.defaultValue !== undefined && this.defaultValue !== '') {
      var value = this.options.filter(option => option.numeroCompte == this.defaultValue);
      console.log(this.options);
      console.log(this.defaultValue);
      console.log(value);
      this.selectAutoComplete.controls['item'].setValue(value[0]);
    }
  }
}

import { Component, OnInit, Input, EventEmitter, Output, Injector, forwardRef, SimpleChanges } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormBuilder } from '@angular/forms';
import { RequestType } from '../../domain/request-type.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { MainComponent } from '../main/main.component';
// export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any =
@Component({
  selector: 'microfi-lov-form',
  templateUrl: './microfi-lov-form.component.html',
  styleUrls: ['./microfi-lov-form.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MicrofiLovFormComponent), multi: true }
  ]
})
export class MicrofiLovFormComponent extends MainComponent implements ControlValueAccessor {

  @Input('isDisabled') isDisabled = false;
  @Input('label') label = 'Mon label';
  @Input('clientPhysique') clientPhysique = true;
  @Input('clientMorale') clientMorale = false;
  @Input('associe') associe = false;
  @Input('actif') actif = true;
  @Input('parentForm') parentForm: FormGroup;
  @Input('tooltip') tooltip = 'Cliquez sur le champ et appuyez sur F4 pour acceder la boite de recherche';
  @Output() selectedItemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectedItem = new EventEmitter();

  @Input() url: string;
  @Input() requestType: RequestType;
  @Input() libelle: string;
  @Input() data?: any;
  @Input() agence?: any;
  @Input() postParams?: any;
  @Input() defaultValue?: any;
  @Input() devise?: any;
  @Input() enable?: boolean = true;
  @Input('selectedItem') selectedItem: any = {
    code: "",
    libelle: "",
  };

  actualValue = {
    code: "",
    libelle: "",
  };
  user = {
    code: "",
    libelle: "",
  }
  items = [
    {
      code: "NKOU",
      libelle: "NKOUAMBIA NKOUEJI EDGAR",
      sp_libelle: "NKOU - NKOUAMBIA NKOUEJI EDGAR"
    }];
  typedValue = '';
  filteredItems = [];
  findParam = {
    "uniteId": environment.idUniteBancaire,
    "code": null,
    "first": 0,
    "max": -1
  };
  selectAutoComplete: FormGroup;

  constructor(injector: Injector, private http: HttpClient, private formBuilder: FormBuilder) {
    super(injector);
    this.selectAutoComplete = this.formBuilder.group({
      item: new FormControl(""),
    });
  }

  get value(): any {
    return this.selectAutoComplete.value;
  }
  set value(value: any) {
    console.log(value);
    if (value != null) {
      this.selectAutoComplete.patchValue({ item: value });

      this.onTouched();
    }
  }

  public onTouched: () => void = () => { };

  writeValue(value) {
    if (value) {
      console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwww")
      this.value = value;
    }

    if (value === null) {
      this.selectAutoComplete.reset();
    }
  }
  registerOnChange(fn: any): void {
    console.log("on change");
    this.selectAutoComplete.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    console.log("on blur");
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.selectAutoComplete.disable() : this.selectAutoComplete.enable();
  }
  onChange: any = (value) => {
  };
  ngOnInit(): void {
    if (this.parentForm != null && this.parentForm != undefined) {
      this.selectAutoComplete.setParent(this.parentForm);
      console.log(this.parentForm);
    }
    if (this.requestType == RequestType.GET) {

      this.http.get((this.data) ? this.url + "/" + this.data : this.url)
        .toPromise()
        .then((res: any) => {
          this.filteredItems = res.returnValue.forEach((item) => item.sp_libelle = item.code + ' - ' + item.libelle);
          // this.updateItem();
        })
        .catch();
    } else if (this.requestType == RequestType.POST) {
      if (this.postParams !== null && this.postParams !== undefined) {
        this.findParam = this.postParams;
      }
      this.http.post(this.url, this.findParam).toPromise()
        .then((res: any) => {
          console.log(res);
          this.filteredItems = res.returnValue.forEach((item) => item.sp_libelle = item.code + ' - ' + item.libelle);

          // this.updateItem();

        })
        .catch();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("devise", this.devise);
    // console.log("agence", this.agence);
    // console.log("data", this.data);
    // console.log("enable", this.enable);
    if (this.agence != undefined && this.devise != undefined) {
      this.url = this.url + this.agence.item.code + "/" + this.devise.item.code;
      console.log(this.url);
    }

    if (this.requestType == RequestType.GET && this.agence != undefined && this.devise != undefined) {
      this.http.get(environment.baseApiUrl + this.url)
        .toPromise()
        .then((res: any) => {
          if (res.success) {
            this.filteredItems = res.returnValue.forEach((item) => item.sp_libelle = item.code + ' - ' + item.libelle);
          }

        })
        .catch();
    }
    if (!this.enable) {
      this.selectAutoComplete.disable()
    }
    console.log(this.defaultValue);
    if (this.defaultValue !== null && this.defaultValue !== null && this.defaultValue !== undefined && this.defaultValue !== '') {
      var value = this.filteredItems.filter(option => option.code == this.defaultValue);
      console.log(this.defaultValue);
      console.log(value);
      this.selectAutoComplete.controls['item'].setValue(value[0]);
    }
  }
  checkAccountEvent(event: any, op: any) {
    console.log(event);
    if (event.key == 'F4') {
      op.toggle(event);
    }
    if (event.key == 'Escape') {
      this.actualValue = {
        code: "",
        libelle: "",
      };

    }
  }
  focusLost(event: any) {
    console.log(event);
  }
  onRowSelect(event: any, op: any) {
    console.log(event);
    this.onSelectedItem.emit(event.value);
    op.toggle(event);
    this.actualValue = event.value

  }
  searchUser() {

  }
  filterItems(event) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.sp_libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredItems = filtered;
  }
}

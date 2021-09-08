import { Component, OnInit, Input, EventEmitter, Output, Injector, forwardRef, ViewChild, ElementRef, OnDestroy, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, ControlContainer } from '@angular/forms';
import { MainComponent } from '../main/main.component';
import { Subscription } from 'rxjs';

// export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any =
@Component({
  selector: 'microfi-user-form',
  templateUrl: './microfi-user-form.component.html',
  styleUrls: ['./microfi-user-form.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MicrofiUserFormComponent), multi: true }
  ]
})
export class MicrofiUserFormComponent extends MainComponent implements ControlValueAccessor, OnDestroy {
  @Input('isDisabled') isDisabled = false;
  @Input('clientPhysique') clientPhysique = true;
  @Input('clientMorale') clientMorale = false;
  @Input('associe') associe = false;
  @Input('actif') actif = true;
  @Input('parentForm') parentForm: FormGroup;
  @Input('label') label = 'Membre';
  @Input('tooltip') tooltip = 'Cliquez sur le champ et appuyez sur F4 pour acceder la boite de recherche';
  @Input('criteres') criteres = [{ name: 'Nom du membre', code: 'intituleClient' }, { name: "Code", code: "code" }];
  critere = { name: 'Nom du membre', code: 'intituleClient' };
  subscriptions: Subscription[] = [];
  @Output() selectedUserChange: EventEmitter<any> = new EventEmitter<any>();

  @Input('selectedUser') selectedUser: any = {
    idClient: "",
    intituleClient: " ",
    tax_Tpin_Num: "",
    nomCli2: "",
    idProvince: "",
    idDistrict: "",
    codePersonne: "",
    postalCode: "",
    ville: "",
    faxNumber: "",
    natureClient: "",
    qualite: ""
  };
  actualValue: any = {
    idClient: "",
    intituleClient: "  ",
    tax_Tpin_Num: "",
    nomCli2: "",
    idProvince: "",
    idDistrict: "",
    adresse4: "",
    postalCode: "",
    ville: "",
    faxNumber: "",
    natureClient: "",
    qualite: ""
  };

  users = [];
  findDTOUsers =
    {
      alias: {},
      codeAgence: "0904",
      codeUnite: "00001",
      equal: {},
      first: 0,
      like: {},
      max: 25
    }
  selectAutoComplete: FormGroup;
  // item: FormControl = new FormControl();
  typedValue = '';
  url = environment.api.physicalCustomerPage;
  cardAnchor: any;
  keyupSub: Subscription;
  @ViewChild('userSearchInput') userSearchInput: ElementRef;
  @Output() onSelectedItem = new EventEmitter();

  constructor(injector: Injector, private formBuilder: FormBuilder) {
    super(injector);
    this.selectAutoComplete = this.formBuilder.group({
      item: new FormControl(""),
    });
    this.subscriptions.push(
      this.selectAutoComplete.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );

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

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
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

  ngOnInit(): void {
    if (this.clientMorale) {
      this.url = environment.api.moralCustomerPage;
    }
    if (this.parentForm != null && this.parentForm != undefined) {
      this.selectAutoComplete.setParent(this.parentForm);
      console.log(this.parentForm);
    }
    if (this.selectedUser != null && this.selectedUser != undefined) {
      this.actualValue = this.selectedUser;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedUser != null && this.selectedUser != undefined) {
      this.actualValue = this.selectedUser;
    }
  }
  checkAccountEvent(event: any, op: any) {
    console.log(event);
    if (event.key == 'F4') {
      this.cardAnchor = event;
      op.toggle(event);
    }
    if (event.key == 'Escape') {

    }
  }
  focusLost(event: any) {
    console.log(event);
    console.log(this.actualValue);
    if (this.actualValue.idClient.length !== 9) {
      this.actualValue = {
        idClient: "",
        intituleClient: "  ",
      };
      this.selectedUser = {
        idClient: "",
        intituleClient: "  ",
      }
      this.onSelectedItem.emit({
        idClient: "",
        intituleClient: "  ",
      });
      this.selectedUserChange.emit({
        idClient: "",
        intituleClient: "  ",
      });
    }
  }
  onRowSelect(compte: any, op: any) {
    console.log(compte);
    this.actualValue = compte;
    this.selectedUser = compte;
    this.writeValue(compte);
    this.selectAutoComplete.controls['item'].setValue(compte);
    console.log(this.selectAutoComplete.value);
    this.onSelectedItem.emit({ item: this.selectedUser });
    this.selectedUserChange.emit({ item: this.selectedUser });
    op.toggle(this.cardAnchor);


  }
  searchUser() {
    this.findDTOUsers.alias = {};
    this.findDTOUsers.like = {};
    this.findDTOUsers.like[this.critere.code] = this.typedValue.toUpperCase() + '%';
    this.apiService.post(this.url, this.findDTOUsers).subscribe((data) => {
      this.users = data.returnValue;
    })
  }

}

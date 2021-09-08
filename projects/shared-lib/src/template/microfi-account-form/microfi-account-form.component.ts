import { Component, Input, OnInit, Output, EventEmitter, forwardRef, Injector, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MainComponent } from '../main/main.component';
import { AdossageComponent } from '../../template/adossage/adossage.component';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment.prod';
// export const CUSTOM_INPUT_CONTROL_VALUE: any =
@Component({
  selector: 'microfi-account-form',
  templateUrl: './microfi-account-form.component.html',
  styleUrls: ['./microfi-account-form.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MicrofiAccountFormComponent), multi: true }
  ]


})
export class MicrofiAccountFormComponent extends MainComponent implements ControlValueAccessor {

  @Input('isDisabled') isDisabled = false;
  @Input('label') label = 'Compte';
  @Input('adossage') adossage: boolean = false;
  @Input('actif') actif = true;
  @Input('parentForm') parentForm: FormGroup;
  @Input('checkOpposition') checkOpposition: boolean = false;
  @Output() selectedUserChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('selectedUser') selectedUser: any = {
    numeroCompte: '',
    cleCompte: '',
    libCompte1: '',
    deviseLibelle: '',
    codeDevise: '',
    intitule: '',
    devise: { code: '' },
    agence: { code: '' },
    client: { intituleClient: '' }
  };
  criteres = [
    { name: 'Intitule compte', code: 'intitule', alias: '' },
    { name: 'Nom membre', code: 'client.intituleClient', alias: 'client' },
    { name: 'Num compte', code: 'numeroCompte', alias: '' }
  ];
  critere = { name: 'Intitule compte', code: 'intitule', alias: '' };
  actualValue = {
    numeroCompte: '',
    cleCompte: '',
    libCompte1: '',
    deviseLibelle: '',
    codeDevise: '',
    intitule: '',
    devise: { code: '' },
    agence: { code: '' },
    client: { intituleClient: '' }


  };

  users = [];
  innerValue: any;
  directSearch = false;
  selectAutoComplete: FormGroup = this.formBuilder.group({
    item: ['']
  });
  @Output() onSelectedItem = new EventEmitter();
  cardAnchor: any;
  findDTOUsers =
    {
      alias: {},
      codeAgence: "0904",
      codeUnite: "00001",
      equal: {},
      first: 0,
      like: {},
      max: 25
    };
  typedValue = '';
  url = environment.api.accountPage;
  subscriptions: Subscription[] = [];

  constructor(injector: Injector, private formBuilder: FormBuilder,) {
    super(injector);
    this.selectAutoComplete = this.formBuilder.group({
      item: new FormControl(""),
    });

  }


  onChange: any = (value) => {

    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwww")
    console.log("Received value :", value);
  };
  onTouched: any = () => {
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwww")
  };




  writeValue(value) {
    if (value) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      this.value = value;
    }

    if (value === null) {
      this.selectAutoComplete.reset();
    }
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    console.log(value);
  }
  registerOnChange(fn: any): void {
    console.log("on change");
    this.onChange = fn;
    this.selectAutoComplete.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    console.log("on blur");
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.selectAutoComplete.disable() : this.selectAutoComplete.enable();
  }


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
    if (this.parentForm != null && this.parentForm != undefined) {
      this.selectAutoComplete.setParent(this.parentForm);
      console.log(this.parentForm);
    }

    console.log(this.selectedUser);
    if (this.selectedUser != null && this.selectedUser != undefined) {
      if (this.selectedUser.agence == undefined || this.selectedUser.agence == null) {
        this.selectedUser.agence = { code: '' }
      }
      if (this.selectedUser.devise == undefined || this.selectedUser.devise == null) {
        this.selectedUser.devise = { code: '' }
      }
      if (this.selectedUser.client == undefined || this.selectedUser.client == null) {
        this.selectedUser.client = { intituleClient: '' }
      }
      this.typedValue = this.selectedUser.intituleCompte;
      // this.directSearch = false;
      this.searchUser();
      this.actualValue = this.selectedUser;
    }
    console.log('any1')

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedUser != null && this.selectedUser != undefined) {
      if (this.selectedUser.agence == undefined || this.selectedUser.agence == null) {
        this.selectedUser.agence = { code: '' }
      }
      if (this.selectedUser.devise == undefined || this.selectedUser.devise == null) {
        this.selectedUser.devise = { code: '' }
      }
      if (this.selectedUser.client == undefined || this.selectedUser.client == null) {
        this.selectedUser.client = { intituleClient: '' }
      }
      this.typedValue = this.selectedUser.intituleCompte;
      // this.directSearch = false;
      this.actualValue = this.selectedUser;
      this.searchUser();
    }
    console.log(this.selectedUser);
  }

  checkAccountEvent(event: any, op: any) {
    console.log(event);
    if (event.key == 'F4') {
      this.cardAnchor = event;

      op.toggle(event);
    }
    if (event.key == 'Escape') {
      this.actualValue = {
        numeroCompte: '',
        cleCompte: '',
        libCompte1: '',
        deviseLibelle: '',
        codeDevise: '',
        intitule: '',
        devise: { code: '' },
        agence: { code: '' },
        client: { intituleClient: '' }

      };

    }
  }
  focusLost(event: any) {
    if (this.actualValue.numeroCompte.length !== 11) {
      this.actualValue = {
        numeroCompte: '',
        cleCompte: '',
        libCompte1: '',
        deviseLibelle: '',
        codeDevise: '',
        intitule: '',
        devise: { code: '' },
        agence: { code: '' },
        client: { intituleClient: '' }

      };
      this.selectedUser = {
        numeroCompte: '',
        cleCompte: '',
        libCompte1: '',
        deviseLibelle: '',
        codeDevise: '',
        intitule: '',
        devise: { code: '' },
        agence: { code: '' },
        client: { intituleClient: '' }
      }
      this.onSelectedItem.emit({
        item: {
          numeroCompte: '',
          cleCompte: '',
          libCompte1: '',
          deviseLibelle: '',
          codeDevise: '',
          intitule: '',
          devise: { code: '' }
        }
      });
      this.selectedUserChange.emit({
        item: {
          numeroCompte: '',
          cleCompte: '',
          libCompte1: '',
          deviseLibelle: '',
          codeDevise: '',
          intitule: '',
          devise: { code: '' }
        }
      });
      console.log('any')
    }
  }
  onRowSelect(compte: any, op: any) {
    console.log(compte);
    // this.actualValue = this.selectedUser;
    this.actualValue = compte;
    this.selectedUser = compte;
    // this.writeValue(compte);
    if (this.adossage) {
      if (!compte.client.code)
        compte.client.code = '';
      op.toggle(this.cardAnchor);

      this.openAdossageDialog(compte);
      return;
    }
    this.onSelectedItem.emit({ item: this.selectedUser });
    this.selectedUserChange.emit({ item: this.selectedUser });
    if (this.parentForm != null && this.parentForm != undefined) {
      // this.parentForm.setValue({ item: compte });
      this.selectAutoComplete.controls['item'].setValue(compte);
    }
    op.toggle(this.cardAnchor);
    // console.log(this.parentForm);
    // console.log(this.actualValue);
    // console.log(this.selectedUser);
  }
  changeInput(newValue) {
    console.log('newvalue', newValue)

    this.selectedUser = this.actualValue;
    // this.inputValueChange.emit(newValue);
  }
  searchUser() {
    this.findDTOUsers.alias = {};
    this.findDTOUsers.like = {};
    // this.findDTOUsers.alias[this.critere.code] = this.critere.code;
    if (this.typedValue !== undefined && this.typedValue !== null) {
      this.findDTOUsers.like[this.critere.code] = this.typedValue.toUpperCase() + '%';
      if (this.critere.alias != '') {
        this.findDTOUsers.alias[this.critere.alias] = this.critere.alias;
      }
      this.apiService.post(this.url, this.findDTOUsers).subscribe((data) => {
        this.users = data.returnValue;
        if (this.directSearch == true && data.returnValue.length > 0) {
          this.actualValue = data.returnValue[0];
          // this.directSearch = false;
        }
      })
    }

  }
  openAdossageDialog(compte): void {
    const dialogRef = this.dialog.open(AdossageComponent, {
      width: '90vw',
      data: { item: compte }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "OUI" || result == "oui" || result == "Oui" || result == "YES" || result == "yes" || result == "Yes") {
        // this.filteredRecords.next(this.records.slice());
        this.onSelectedItem.emit({ item: compte });
        this.selectedUserChange.emit({ item: compte });
        this.selectAutoComplete.controls['item'].setValue(compte);
        this.onChange(compte);
        return compte;
      } else {

        let value: any = {}
        value.item = {};
        value.item.client = {};
        // this.onChange(value);
        // this.setInitialValue();
        this.onSelectedItem.emit(value);
        this.selectedUserChange.emit(value);
        this.selectAutoComplete.controls['item'].setValue({});
        this.onChange(value);
        this.selectedUser = {
          numeroCompte: '',
          cleCompte: '',
          libCompte1: '',
          deviseLibelle: '',
          codeDevise: '',
          intitule: '',
          devise: { code: '' },
          agence: { code: '' },
          client: { intituleClient: '' }
        }
        this.actualValue = {
          numeroCompte: '',
          cleCompte: '',
          libCompte1: '',
          deviseLibelle: '',
          codeDevise: '',
          intitule: '',
          devise: { code: '' },
          agence: { code: '' },
          client: { intituleClient: '' }
        }
        return value;
      }
    });
  }
  changeCriteria(event) {
    // console.log(event)
    var index = this.criteres.findIndex((val) => { return val.code == this.critere.code });
    if (index != -1) {
      this.critere = this.criteres[index];

    }
  }
}

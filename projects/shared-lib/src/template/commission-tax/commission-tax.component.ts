import { Inject, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../template/api.service';
import { ViewComponent } from '../../template/view/view.component';
import { environment } from '../../environments/environment.prod';


@Component({
  selector: 'microfi-commission-tax',
  templateUrl: './commission-tax.component.html',
  styleUrls: ['./commission-tax.component.scss']
})
export class CommissionTaxComponent extends ViewComponent implements OnChanges {


  data: any = {};
  commissionUrl: string;
  @Input() readonly: boolean = false;
  @Input() codeDevise: string;
  @Input() codeUnite: string = environment.codeUniteBancaire;
  @Input() numCompte: any;
  @Input() uniteId: number = environment.idUniteBancaire;
  @Input() montant: number;
  @Input() natTrans: string;
  @Input() user: string = "ROOT"



  ngOnInit() {
    super.ngOnInit();
    this.data = {};
    this.data.account = {};
    this.data.account.item = {};
    this.data.account.item.client = {};
    this.data.benef = {};
    this.data.benef.item = {};
    this.data.benef.item.client = {};
  }

  constructor(injector: Injector, private api: ApiService) {
    super(injector);
    this.uniteId = environment.idUniteBancaire;
    this.codeUnite = environment.codeUniteBancaire;
    this.commissionUrl = environment.api.calculerCommission;
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes here.........", changes)
    console.log("this.codeDevise.........", this.codeDevise)
    console.log("this.codeUnite.........", this.codeUnite)
    console.log("this.montant.........", this.montant)
    console.log("this.codeUnite.........", this.codeUnite)
    console.log("this.natTrans.........", this.natTrans)
    console.log("this.numCompte.........", this.numCompte)
    console.log("this.uniteId.........", this.uniteId)
    console.log("this.user.........", this.user)

    if (this.codeDevise != null &&
      this.codeUnite != null &&
      this.montant != null &&
      this.natTrans != null && this.numCompte != null && this.uniteId != null && this.user) {
      console.log("Godddddd")
      this.doCalculCommission()
    }
    return;
  }

  doCalculCommission() {
    this.record.codeDevise = this.codeDevise;
    this.record.codeUnite = this.codeUnite;
    this.record.montant = this.montant;
    this.record.natTrans = this.natTrans;
    this.record.numCompte = {};
    this.record.numCompte.racine = this.numCompte.numeroCompte;
    this.record.numCompte.cle = this.numCompte.cleCompte;
    this.record.numCompte.coddevIso = this.numCompte.devise.code;
    this.record.uniteId = this.uniteId;
    this.record.user = this.user;
    console.log("this.record.........", this.record)
    this.apiService.post(this.commissionUrl, this.record).subscribe(
      response => {
        console.log("the console", response)
        if (response.success) {
          this.data = response.returnValue;
        } else {
          console.log("Error message", this.record)
          // this.openError(response.returnMsg)
        }
      }, error => {
        console.log("Error message", error.message)
        // this.openError(error.message)
        // this.openError(error.message)
      }
    )
  }





}



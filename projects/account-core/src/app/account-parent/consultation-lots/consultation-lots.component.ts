import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';

@Component({
  selector: 'microfi-consultation-lots',
  templateUrl: './consultation-lots.component.html',
  styleUrls: ['./consultation-lots.component.scss']
})
export class ConsultationLotsComponent extends ViewComponent {

  tableData = [];
  findHistorique = {
    dteComptable: 0,
    refLot: "",
    referencePiece: "",
    historique: "Oui",
  }
  displayedColumns: string[] = ['reference', 'typeOperation', 'agence', 'compte', 'libelle', 'sens', 'montantDebit', 'montantCredit', 'dteCptable', 'dteValeur', 'userSaisi', 'userValid'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public injector: Injector) {
    super(injector);
    console.log(data);
    this.findHistorique = data;
    // this.echeanceData = data;
  }

  ngOnInit(): void {
    this.apiService.get(environment.api.findHistory + '/' + this.findHistorique.refLot + "/" + this.findHistorique.dteComptable + "/" + this.findHistorique.historique)
      .subscribe((data) => {
        console.log(data);
        if (data.success == true) {
          this.tableData = data.returnValue;
        }
      })
  }

}

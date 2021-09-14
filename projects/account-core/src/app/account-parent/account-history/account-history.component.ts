import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FindHistoParam } from 'projects/shared-lib/src/domain/FindHistoParam';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { MainComponent } from 'projects/shared-lib/src/template/main/main.component';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { AccountService } from '../account.service';


@Component({
  selector: 'microfi-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.scss']
})
export class AccountHistoryComponent extends MainComponent implements OnInit {

  param: FindHistoParam;
  labelClient = "Compte";
  infosHistorique: FormGroup;
  par_email = false;
  DisableClient = false;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlDeviseList = environment.api.deviseList;
  parMail: boolean;

  constructor(injector: Injector) {
    super(injector);

    this.infosHistorique = this.formGroupBuilder.group({
      uniteBancaire: [],
      agence: [],
      devise: [],
      numeroCompte: [],
      cleCompte: [''],
      intituleCompte: [''],
      intituleClient: [''],
      compte: [],
      dateDebut: [null],
      dateFin: [null],
      parMail: [false],
    });

    this.param = new FindHistoParam();
  }

  ngOnInit(): void {
  }

  search() {
    super.search();
    this.logger.info(this.infosHistorique.value);

    this.param.numeroCompte = this.infosHistorique.value.compte.item.numeroCompte;
    this.param.cleCompte = this.infosHistorique.value.compte.item.cleCompte;
    this.param.debut = this.infosHistorique.value.dateDebut.toLocaleString();
    this.param.fin = this.infosHistorique.value.dateFin.toLocaleString();
    this.parMail = this.infosHistorique.value.parMail;

    console.log(this.param);
    console.log(this.parMail);

    this.accountService.findHistory(this.param).subscribe((response: any) => {
      console.log(response);

    });

  }

}

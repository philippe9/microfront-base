import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { AccountManagerService } from '../account-manager.service';

@Component({
  selector: 'microfi-type-compte-view',
  templateUrl: './type-compte-view.component.html',
  styleUrls: ['./type-compte-view.component.scss']
})
export class TypeCompteViewComponent extends ViewComponent implements OnInit {
  urlTypeCompteList = environment.api.typeCompteList + '/' + environment.idUniteBancaire;
  enum: string;
  searchInfo = this.formGroupBuilder.group({
    typeCompte: [], montantMaxDebit: [], cumulJour: []
  });

  constructor(injector: Injector, private accountManagerService: AccountManagerService) {
    super(injector);
  }

  ngOnInit(): void {
  }


}

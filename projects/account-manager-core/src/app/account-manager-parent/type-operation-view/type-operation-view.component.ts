import { FormGroup } from '@angular/forms';
import { Component, Injector, OnInit } from '@angular/core';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { AccountManagerService } from '../account-manager.service';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';

@Component({
  selector: 'microfi-type-operation-view',
  templateUrl: './type-operation-view.component.html',
  styleUrls: ['./type-operation-view.component.scss']
})
export class TypeOperationViewComponent extends ViewComponent implements OnInit {
  urlTypeOperationList = environment.api.typeOperationList + '/' + environment.codeAgence;
  typeOperationForm: FormGroup;

  enum: string;

  constructor(injector: Injector, private accountManagerService: AccountManagerService) {
    super(injector);
  }

  ngOnInit(): void {
    this.typeOperationForm = this.formGroupBuilder.group({
      typeOperation: [], montantMaxProv: [], cumulJour: []
    });
  }


}

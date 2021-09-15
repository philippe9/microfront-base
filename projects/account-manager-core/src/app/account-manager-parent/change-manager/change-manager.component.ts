import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';

@Component({
  selector: 'microfi-change-manager',
  templateUrl: './change-manager.component.html',
  styleUrls: ['./change-manager.component.scss']
})
export class ChangeManagerComponent extends ViewComponent {
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlGestionnaireList = environment.api.gestionnaireList + environment.idUniteBancaire;
  gestionnaire: any;
  ancienGestionnaire: any
  nouveauGestionnaire: any;
  labelClient = "Compte";
  DisableClient = false;
  changeForm: FormGroup = this.formGroupBuilder.group({
    numeroDebut: [],
    numeroFin: [],
    customer: [],
    account: []
  });;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }
  submitForm(type) {
    var data = {
      option: type,
      typeFichier: '',
      codeUser: 'ROOT',
      numeroDebut: this.changeForm.value.numeroDebut,
      numeroFin: this.changeForm.value.numeroFin,
      codeGestionnaire: this.gestionnaire.item?.code,
      codeOldGestionnaire: this.ancienGestionnaire?.item?.code,
      codeNewGestionnaire: this.nouveauGestionnaire?.item?.code,
      codeClient: this.changeForm.value.customer?.item?.idClient,
      numeroCompte: this.changeForm.value.account?.item?.numeroCompte,
      cleCompte: this.changeForm.value.account?.item?.cleCompte,
    };
    // switch (type) {
    //   case "Compte":

    //     break;
    //   case "Client":

    //     break;
    //   case "Groupe":

    //     break;

    //   default:
    //     break;
    // }
    this.apiService.post(environment.api.changeGestionnaire, data).subscribe((response) => {
      if (response.success) {
        this.alerteDialog("Changement effectue");
      }
    })
  }
}

import { AccountManager } from 'projects/shared-lib/src/domain/AccountManager';
import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { AccountManagerService } from '../account-manager.service';
import { GestionnaireDto } from 'projects/shared-lib/src/domain/GestionnaireDto';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';
import { IHash } from 'projects/shared-lib/src/domain/SearchParam';

@Component({
  selector: 'microfi-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent extends ViewComponent implements OnInit {

  managerFormGroup: FormGroup;

  response: any;

  codeUniteBancaire: string;
  accountManager: AccountManager;
  gestionnaireDtoList: GestionnaireDto[] = [];
  displayedColumnsGestionnaire: string[] = ['code', 'nom'];
  // dataSource: AccountManager[] = [];
  filteredOptions: Observable<string[]>;

  urlUniteBancaireList = environment.api.uniteBancaireList;
  link = [''];
  enum: Dialog.CREATION;

  constructor(injector: Injector, private accountManagerService: AccountManagerService) {
    super(injector);
    this.requestType = RequestType.GET;
    this.searchUrl = environment.api.accountManagerPage;
  }

  ngOnInit(): void {
    this.managerFormGroup = this.formGroupBuilder.group({
      unite: [], code: [], nom: []
    });

    // this.accountManagerService.listAccountManagerAutorise().subscribe(
    //   (response) => {
    //     let listGestionnaireTotal: AccountManager[];

    //     listGestionnaireTotal = response.returnValue;
    //     for (let item of listGestionnaireTotal) {
    //       let gestionnaire = new GestionnaireDto(item.id, item.code + ' - ' + item.nom);
    //       this.gestionnaireDtoList.push(gestionnaire);
    //     }
    //     console.log(this.gestionnaireDtoList);
    //     this.accountManagerService.gestionnaireAutoriseTotal = this.gestionnaireDtoList;
    //   }
    // );

  }


  parseSelectValue(value: string): string {
    if (value != null) {
      let tabValue = value.split("-");
      if (tabValue.length != 0) {
        return tabValue[0].trim();
      }
    }
  }

  find() {
    super.builSearchCriterias();
    this.logger.info(this.managerFormGroup.value);
    console.log(this.managerFormGroup.value);
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    alias["unite"] = "unite";
    if (this.managerFormGroup.value.code !== null) {
      equal["code"] = this.managerFormGroup.value.code;

    }
    if (this.managerFormGroup.value.nom !== null) {
      equal["nom"] = this.managerFormGroup.value.nom;

    }
    if (this.managerFormGroup.value.unite?.item !== null) {
      equal["unite.code"] = this.managerFormGroup.value.unite?.item?.code;

    }
    // this.searchCriteria.codeUnite = this.managerFormGroup.value.unite.item.code;
    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    this.logger.info(this.searchCriteria);
    super.find(AccountManager);
  }

  /*   Details(accountManager) {
      this.accountManagerService.gestionnaireDetails = accountManager;
      this.router.navigate([this.env.accountManagerView.url], { queryParams: { enum: Dialog.CONSULTER } });
    }

    Modifier(accountManager) {
      this.accountManagerService.gestionnaireDetails = accountManager;
      this.router.navigate([this.env.accountManagerView.url], { queryParams: { enum: Dialog.MODIFICATION } });
    } */

  async deleteUser() {
    var user = this.selectedItemOnTables

    let result = await this.confirmationDialog({ heading: "Confirmation", message: "Voulez vous supprimer cet utilisateur ?", type: "warn" });
    console.log(result);
    if (result) {
      // simulation.dateDernEcheance = this.dateInvert(simulation.dateDernEcheance);
      // simulation.dateMiseEnPlace = this.dateInvert(simulation.dateMiseEnPlace);
      let data = await this.apiService.post(environment.api.accountManagerDelete, user).toPromise();
      if (data.success) {
        this.alerteDialog("Gestionnaire Supprimé ");
        this.find();
      }
    } else {

    }
  }



  openPage(type) {
    switch (type) {
      case "Modifier":
        this.router.navigate(['/account-manager/edit', this.selectedItemOnTables.code]);
        break;
      case "Consulter":
        this.router.navigate(['/account-manager/view', this.selectedItemOnTables.code]);
        break;
      case "Supprimer":
        this.deleteUser();
        break;

      default:
        break;
    }
  }
  selectedItem(item: any) {
    this.selectedItemOnTables = item;
  }

}

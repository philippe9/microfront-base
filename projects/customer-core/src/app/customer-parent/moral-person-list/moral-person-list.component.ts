import { Component, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';
import { SelectAutoCompleteModel } from '../../../../../shared-lib/src/template/select-auto-complete/select-auto-complete.model';
import { IHash } from '../../../../../shared-lib/src/domain/SearchParam';
import { MoralPerson } from 'projects/shared-lib/src/domain/MoralPerson';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';


@Component({
  selector: 'microfi-moral-person-list',
  templateUrl: './moral-person-list.component.html',
  styleUrls: ['./moral-person-list.component.scss']
})
export class MoralPersonListComponent extends ViewComponent {
  public searchFormGroup: FormGroup;
  public autoComplete: FormGroup;
  urlUniteBancaireList: string = environment.api.uniteBancaireList;
  urlAgenceList: string = environment.api.agenceList;
  selectAutoCompleteModel: SelectAutoCompleteModel;




  constructor(injector: Injector) {
    super(injector);
    this.base = this.environment.module.moral;
    this.searchFormGroup = this.formGroupBuilder.group({
      unite: [],
      unite1: [],
      code: [], rccm: [], nom: [], tel: [], prenom: [],
      dateNaissance: [], agence: []
    });

    this.displayedColumns = [
      'num_membre', 'categorie_interne', 'intitule_membre', 'telephone',
      'nature', 'parts_sociales', 'fonds_solidarite',
      'date_adhesion'
    ];
    this.base = environment.api.moralCustomerPage;
    this.searchUrl = environment.api.moralCustomerPage;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  find() {
    super.builSearchCriterias();
    this.logger.info(this.searchFormGroup.value);
    let alias: IHash = {};
    let like: IHash = {};
    let equal: IHash = {};
    if (this.searchFormGroup.value.code !== null) {
      equal["code"] = this.searchFormGroup.value.code;
    }
    if (this.searchFormGroup.value.taxable !== null) {
      // equal["taxable"] = this.searchFormGroup.value.taxable ? 'Oui' : 'Non';
    }
    if (this.searchFormGroup.value.nom !== null) {
      like["intituleClient"] = this.searchFormGroup.value.nom;
    }
    if (this.searchFormGroup.value.rccm !== null) {
      like["numEnreg"] = this.searchFormGroup.value.rccm;
    }
    if (this.searchFormGroup.value.tel !== null) {
      like["telephone"] = this.searchFormGroup.value.tel;
    }




    this.searchCriteria.codeUnite = this.searchFormGroup.value.unite.item.code;
    this.searchCriteria.codeAgence = this.searchFormGroup.value.agence.item.code;
    this.searchCriteria.equal = equal;
    this.searchCriteria.like = like;
    this.searchCriteria.alias = alias;
    this.logger.info(this.searchCriteria);
    super.find(new MoralPerson);
  }
  selectedItem(item: any) {
    this.selectedItemOnTables = item;
  }
  public redirectToDetails = () => {
    var user = this.selectedItemOnTables
    this.router.navigate(['customer/' + environment.routes.moralCustomer.url], { queryParams: { mode: Dialog.CONSULTATION, code: user.idClient } });
  }

  public redirectToUpdate = () => {
    var user = this.selectedItemOnTables

    this.router.navigate(['customer/' + environment.routes.moralCustomer.url], { queryParams: { mode: Dialog.MODIFICATION, code: user.idClient } });
  }

  async deleteUser() {
    var user = this.selectedItemOnTables

    let result = await this.confirmationDialog({ heading: "Confirmation", message: "Voulez vous supprimer cet utilisateur ?", type: "warn" });
    console.log(result);
    if (result) {
      // simulation.dateDernEcheance = this.dateInvert(simulation.dateDernEcheance);
      // simulation.dateMiseEnPlace = this.dateInvert(simulation.dateMiseEnPlace);
      let data = await this.apiService.get(environment.api.deleteClientMorale + "/" + user.idClient).toPromise();
      if (data.success) {
        this.alerteDialog("Client Supprimé ");
      }
    } else {

    }
  }
}

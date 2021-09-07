import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from '../../../../../shared-lib/src/environments/environment.prod';
import { ViewComponent } from '../../../../../shared-lib/src/template/view/view.component';
import { PersonPhysic } from '../../../../../shared-lib/src/domain/person-physic';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';


@Component({
  selector: 'microfi-physic-person-list',
  templateUrl: './physic-person-list.component.html',
  styleUrls: ['./physic-person-list.component.scss']
})
export class PhysicPersonListComponent extends ViewComponent {
  urlUniteBancaireList: string = environment.api.uniteBancaireList;
  urlAgenceList: string = environment.api.agenceList;

  searchInfo: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(injector: Injector) {
    super(injector);
    // this.base = this.environment.module.physical;
    this.searchUrl = environment.api.physicalCustomerPage;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.displayedColumns = [
      'num_membre',/*  'categorie_interne', */
      'intitule_membre', 'date_naissance', 'telephone',
      'sexe', 'nature', /* 'parts_sociales',
      'fonds_solidarite', */ 'date_adhesion']; // 'actions'
    this.searchInfo = this.formGroupBuilder.group({
      unite: [], code: [], numIdentite: [], nom: [], telephone: [], prenom: [],
      dateNaissance: [Validators.nullValidator], agence: [], taxable: []
    });
  }

  search() {
    // super.search();
    super.builSearchCriterias();
    this.logger.info(this.searchInfo.value);
    this.equal["code"] = this.searchInfo.value.code ? this.searchInfo.value.code : '';
    // this.equal["taxable"] = this.searchInfo.value.taxable ? 'Oui':'Non';
    this.alias['personne'] = 'personne';
    this.like["personne.dateNaissance"] = this.searchInfo.value.dateNaissance ? this.searchInfo.value.dateNaissance : '';
    this.like["personne.numeroPieceIdentite"] = this.searchInfo.value.numIdentite ? this.searchInfo.value.numIdentite : '';
    this.like["personne.nom"] = this.searchInfo.value.nom ? this.searchInfo.value.nom : '';
    this.like["personne.prenom"] = this.searchInfo.value.prenom ? this.searchInfo.value.prenom : '';
    this.like["telephone1"] = this.searchInfo.value.telephone ? this.searchInfo.value.telephone : '';
    this.like["telephone2"] = this.searchInfo.value.telephone ? this.searchInfo.value.telephone : '';
    this.like["telephone3"] = this.searchInfo.value.telephone ? this.searchInfo.value.telephone : '';
    this.searchCriteria.codeUnite = this.searchInfo.value.unite.item.code;
    this.searchCriteria.codeAgence = this.searchInfo.value.agence.item.code;
    this.searchCriteria.equal = this.equal;
    this.searchCriteria.like = this.like;
    this.searchCriteria.alias = this.alias;
    this.searchCriteria.max = 20;
    this.searchCriteria.first = 0;
    this.logger.info(this.searchCriteria);
    super.find(new PersonPhysic);
  }


  public redirectToDetails = (user: any) => {
    console.log(user);
    if (user.idClient !== null && user.idClient !== "") {
      this.selectedItemOnTables = user;
      this.router.navigate([this.env.physicalCustomer.url], { queryParams: { mode: Dialog.CONSULTATION, code: user.idClient } });
    }

  }
  selectedItem(item: any) {
    this.selectedItemOnTables = item;
  }
  public redirectToUpdate = (user: any) => {
    console.log(user);
    if (user.idClient !== null && user.idClient !== "") {
      this.router.navigate([this.env.physicalCustomer.url], { queryParams: { mode: Dialog.MODIFICATION, code: user.idClient } });
    }

  }
  // public redirectToDelete = (user: any) => {
  //   this.confirmationDialog({ heading: "Confirmation", message: "Voulez vous lever l'opposition sur ce compte ?", type: "warn" }).then((result) => {
  //     if (result) {
  //       user.id = user.idClient;
  //       user.code = user.codePersonne;
  //       this.apiService.post(environment.api.deletePersonne, user).subscribe((data) => {
  //         if (data.success) {
  //           if (data.returnValue) {
  //             this.alerteDialog('Client supprime');
  //           }
  //         }
  //       })
  //     }
  //   })
  // }

  async deleteUser(user) {
    if (user.idClient !== null) {
      let result = await this.confirmationDialog({ heading: "Confirmation", message: "Voulez vous supprimer cet utilisateur ?", type: "warn" });
      console.log(result);
      if (result) {
        // simulation.dateDernEcheance = this.dateInvert(simulation.dateDernEcheance);
        // simulation.dateMiseEnPlace = this.dateInvert(simulation.dateMiseEnPlace);
        let data = await this.apiService.get(environment.api.deleteClientPhysique + "/" + user.idClient).toPromise();
        if (data.success) {
          this.alerteDialog("Client Supprimé ");
        }
      } else {

      }
    }
  }
}

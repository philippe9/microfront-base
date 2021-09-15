import { Component, OnInit } from '@angular/core';
import { AccountManager } from 'projects/shared-lib/src/domain/AccountManager';
import { AccountManagerService } from '../account-manager.service';

@Component({
  selector: 'microfi-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  gestionnaire: AccountManager;
  response: any;

  constructor(private accountManagerService: AccountManagerService) {
  }

  ngOnInit(): void {
  }

  valider() {
    this.accountManagerService.deleteAccountManager(this.accountManagerService.gestionnaireDetails).subscribe(
      (response) => {
        this.response = response.returnValue;
        console.log(this.response);
      }
    )
  }

}

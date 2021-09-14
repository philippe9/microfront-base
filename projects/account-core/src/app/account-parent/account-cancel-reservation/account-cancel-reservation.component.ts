import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { ReservationDTO } from 'projects/shared-lib/src/domain/ReservationDTO';
// import { MainComponent } from 'src/app/template/main/main.component';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { AccountService } from '../account.service';
import { IHash, SearchParam } from 'projects/shared-lib/src/domain/SearchParam';
import { LeveeReservationDTO } from 'projects/shared-lib/src/domain/LeveeReservationDTO';
import { DtoForLeveeReservation } from 'projects/shared-lib/src/domain/DtoForLeveeReservation';
import { ReservationDTOmin } from 'projects/shared-lib/src/domain/ReservationDTOmin';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';

@Component({
  selector: 'microfi-account-cancel-reservation',
  templateUrl: './account-cancel-reservation.component.html',
  styleUrls: ['./account-cancel-reservation.component.scss']
})
export class AccountCancelReservationComponent extends ViewComponent {

  reservation: ReservationDTOmin;
  reservationView: ReservationDTO; //Reservation for view and update
  leveeReservation: LeveeReservationDTO;
  dtoForLeveeReservation: any;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlDeviseList = environment.api.deviseList;
  record: FormGroup;
  disabledEncours = true;
  disabledNanti = true;
  disabledParMembre = false;
  reservationCode = "";
  originalReservation: any;
  constructor(injector: Injector, private formBuilder: FormBuilder) {
    super(injector);

    this.record = this.formBuilder.group({
      uniteBancaire: [],
      agence: [],
      devise: [],
      compte: [''],
      numeroCompte: [''],
      cleCompte: [''],
      intituleCompte: [''],
      intituleClient: [''],
      code: [''],
      montantReservation: [0],
      montantTotalLevee: [0],
      enCours: [false],
      total: [true],
      dateLevee: [null],
      montantLevee: [0],
      commentaire: [''],
      commissions: [''],
      taxes: [''],
    });

    this.leveeReservation = new LeveeReservationDTO();
    this.dtoForLeveeReservation = new DtoForLeveeReservation();
    this.reservation = new ReservationDTOmin();
    this.reservationView = new ReservationDTO();

    this.searchUrl = environment.api.reservationAccountPage;

    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(params);
        this.mode = params.mode;
        this.isView = params.mode == Dialog.CONSULTATION;

        console.log(this.isView);
        super.builSearchCriterias();
        this.reservationCode = params.code;
        let alias: IHash = {};
        let like: IHash = {};
        let equal: IHash = {};
        equal["code"] = params.code;
        this.searchCriteria.equal = equal;
        this.searchCriteria.like = like;
        this.searchCriteria.alias = alias;
        this.searchCriteria.first = 0;
        this.searchCriteria.max = 1;


        this.apiService.post(this.searchUrl, this.searchCriteria)
          .subscribe((data) => {
            console.log(data.returnValue);
            this.reservationView = data.returnValue[0];
            this.originalReservation = data.returnValue[0];
            this.record = this.formBuilder.group(
              {
                /* uniteBancaire:[],
                agence: [],
                devise: [], */
                compte: [],
                numeroCompte: [data.returnValue[0].compte.numeroCompte],
                cleCompte: [data.returnValue[0].compte.cleCompte],
                intituleCompte: [data.returnValue[0].compte.intituleCompte],
                intituleClient: [data.returnValue[0].compte.intituleClient],
                dateLevee: [data.returnValue[0].dteLeve],
                montantLevee: [0],
                enCours: [data.returnValue[0].enCours == "Std_Oui"],
                total: [true],
                code: [data.returnValue[0].code],
                montantReservation: [data.returnValue[0].montantReser],
                montantTotalLevee: [0],
                commentaire: [''],
                commissions: [''],
                taxes: [''],
              }
            )


            this.record.get('numeroCompte').disable();
            this.record.get('cleCompte').disable();
            this.record.get('intituleCompte').disable();
            this.record.get('intituleClient').disable();
            this.record.get('code').disable();
            this.record.get('enCours').disable();
            this.record.get('montantReservation').disable();
            this.record.get('montantTotalLevee').disable();
            this.record.get('montantLevee').disable();
            this.record.get('dateLevee').disable();
            this.record.get('commissions').disable();
            this.record.get('taxes').disable();

            this.record.get('total').valueChanges.subscribe(v => {

              if (v) {
                this.record.get('montantLevee').disable();
              } else {
                this.record.get('montantLevee').enable();
              }
            })

            this.disabledParMembre = true;
          });
      });

  }

  ngOnInit(): void {

  }

  submitForm() {
    const formValue = this.record.value;
    console.log(this.reservationView);
    this.reservation.id = this.reservationView.id;
    this.leveeReservation.reservation = this.reservation;
    this.leveeReservation.date = this.reservationView.dteLeve;
    this.leveeReservation.montant = this.reservationView.montantLev;
    this.leveeReservation.motif = formValue.commentaire;
    this.dtoForLeveeReservation.leveReserv = this.leveeReservation;
    this.dtoForLeveeReservation.codeUser = "ROOT";
    this.dtoForLeveeReservation.agence = this.originalReservation.agence;
    this.dtoForLeveeReservation.unite = this.originalReservation.unite;
    this.dtoForLeveeReservation.levees = this.originalReservation.levees;
    this.dtoForLeveeReservation.compte = this.originalReservation.compte;
    this.dtoForLeveeReservation.reservation = this.reservation;

    console.log(this.dtoForLeveeReservation);
    // this.originalReservation.codeUser = "ROOT";
    this.accountService.leveeReservation(this.dtoForLeveeReservation).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.alerteDialog("Reservation Levee")
      } else {
        this.alerteDialog(response.returnMsg)

      }
    });


  }


}

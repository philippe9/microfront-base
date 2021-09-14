import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompteDTO } from 'projects/shared-lib/src/domain/CompteDTO';
import { Dialog } from 'projects/shared-lib/src/domain/dialog.enum';
import { MiseEnPlaceReservationDTO } from 'projects/shared-lib/src/domain/MiseEnPlaceReservationDTO';
import { RequestType } from 'projects/shared-lib/src/domain/request-type.enum';
import { ReservationDTO } from 'projects/shared-lib/src/domain/ReservationDTO';
import { environment } from 'projects/shared-lib/src/environments/environment.prod';
import { IHash, SearchParam } from 'projects/shared-lib/src/domain/SearchParam';
import { ViewComponent } from 'projects/shared-lib/src/template/view/view.component';

@Component({
  selector: 'microfi-account-reservation-view',
  templateUrl: './account-reservation-view.component.html',
  styleUrls: ['./account-reservation-view.component.scss']
})
export class AccountReservationViewComponent extends ViewComponent {

  reservation: any;
  reservationView: ReservationDTO; //Reservation for view and update
  miseEnplaceReservation: MiseEnPlaceReservationDTO;
  resquesTypeGet: RequestType = RequestType.GET;
  resquesTypePost: RequestType = RequestType.POST;
  urlUniteBancaireList = environment.api.uniteBancaireList;
  urlAgenceList = environment.api.agenceList;
  urlDeviseList = environment.api.urlDeviseList;
  record: FormGroup;
  disabledEncours = true;
  disabledNanti = true;
  disabledParMembre = false;
  Disabled = false;
  reservationCode = "";
  par_membre: true;
  en_cours: true;
  originalReservation: any = { unite: { code: '' }, agence: { code: '' }, numeroCompte: '' };
  displayedColumns: string[] = ['utilisateur', 'date', 'total', 'montant', 'motif'];
  reserveRecord = this.formGroupBuilder.group({
    uniteBancaire: [''],
    agence: [''],
    devise: [''],
    compte: [''],
    numeroCompte: [''],
    cleCompte: [''],
    intituleCompte: [''],
    intituleClient: [''],
    parMembre: [true],
    dateLevee: [null],
    enCours: [false],
    nanti: [false],
    code: [''],
    montant: [''],
    commentaire: [''],
    commissions: [''],
    taxes: [''],
  });
  montantLev = 0;
  dataSource = new MatTableDataSource<any>();
  // dataSource = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(injector: Injector, private formBuilder: FormBuilder) {
    super(injector);

    this.reserveRecord.controls['code'].disable();


    this.reservation = new ReservationDTO();
    this.reservationView = new ReservationDTO();
    this.miseEnplaceReservation = new MiseEnPlaceReservationDTO();
    this.searchUrl = environment.api.reservationAccountPage;

    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(params);
        this.mode = params.mode;
        this.isView = params.mode == Dialog.CONSULTATION;

        if (this.isView || this.mode == '2') {

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
              this.reservationView = data.returnValue[0];
              this.originalReservation = data.returnValue[0];
              console.log(this.originalReservation);

              this.reserveRecord.patchValue({

                compte: data.returnValue[0].compte,
                agence: data.returnValue[0].agence,
                parMembre: true,
                dateLevee: data.returnValue[0].dteLeve,
                enCours: data.returnValue[0].enCours == "Std_Oui",
                nanti: data.returnValue[0].nanti == "Std_Oui",
                code: data.returnValue[0].code,
                montant: data.returnValue[0].montantReser,
                commentaire: data.returnValue[0].commentaire,
                commissions: '',
                taxes: '',
              })
              this.montantLev = this.originalReservation.montantLev;
              this.dataSource.data = this.originalReservation.levees;
              this.reserveRecord.disable();  //Disable le formulaire
              this.reserveRecord.controls['commentaire'].enable();

              this.disabledParMembre = true;
            });
        }

      });

  }

  ngOnInit(): void {

  }

  submitForm() {
    const formValue = this.reserveRecord.value;
    console.log(formValue);
    // return;
    this.reservation.unite = formValue.uniteBancaire?.item;
    this.reservation.agence = formValue.agence?.item;
    this.reservation.compte = new CompteDTO();
    this.reservation.compte.numeroCompte = formValue.compte?.item?.numCompte;
    this.reservation.compte.cleCompte = formValue.compte?.item?.numCompte;
    this.reservation.dteLeve = formValue.dateLevee;
    this.reservation.montantReser = formValue.montant;
    this.reservation.compte = formValue.compte?.item;
    this.reservation.commentaire = formValue.commentaire;
    this.reservation.codeUser = 'ROOT';
    this.originalReservation.codeUser = 'ROOT';
    this.miseEnplaceReservation.reservation = this.reservation;

    // return;
    if (this.isView || this.mode == '2') {
      this.originalReservation.commenaire = formValue.commentaire;

      this.accountService.leveeReservation(this.originalReservation).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.alerteDialog("Leve effectue");
        } else {
          this.alerteDialog(response.returnMsg);
        }
      });
    } else {
      this.accountService.miseEnplaceReservation(this.reservation).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.alerteDialog("Reservation effectue");
        } else {
          this.alerteDialog(response.returnMsg);
        }
      });
    }


  }



}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

import { CommissionOperationDTO } from "./CommissionOperationDTO";
import { ReservationDTO } from "./ReservationDTO";

export class MiseEnPlaceReservationDTO{
    reservation? = new ReservationDTO ;
    commissions? = new Array<CommissionOperationDTO>();
}
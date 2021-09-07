import { CommissionOperationDTO } from "./CommissionOperationDTO";
import { LeveeReservationDTO } from "./LeveeReservationDTO";

export class DtoForLeveeReservation{
    leveReserv? = new LeveeReservationDTO ;
    commissions? = new Array<CommissionOperationDTO>();
}
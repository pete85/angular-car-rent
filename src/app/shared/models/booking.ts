import {Vehicle} from "./vehicle";
import {Customer} from "./customer";

export class Booking {
  _id?: string;
  reference: string;
  email?: string;
  vehicle?: Vehicle;
  customer?: Customer;
  start_date?: Date | string;
  end_date?: Date | string;
  price?: number;
}

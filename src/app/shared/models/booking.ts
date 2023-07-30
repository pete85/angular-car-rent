import {Vehicle} from "./vehicle";
import {Customer} from "./customer";

export class Booking {
  _id?: string | undefined;
  reference: string;
  email?: string;
  vehicle?: Vehicle;
  customer?: Customer;
  start_date?: Date;
  end_date?: Date;
  price?: number;
}

import {Vehicle} from "./vehicle";

export enum ActionType {
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete'
}

export class Action {
  type: ActionType;
  data?: any
}

export class IconConfig {
  name: string;
  tooltip?: string;
  status: boolean = true;
}

export class DialogData {
  name: string;
  formContent?: any;
  width: string;
  maxWidth: string;
  editItem?: any;
  message?: string;
  isActive?: boolean;
  icon?: IconConfig;
  start_date?: Date;
  end_date?: Date;
  vehicle?: Vehicle;
  filters: any;
  price: number;
}

export enum Months {
  JANUARY,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER
}

export interface appColour {
  name: string;
  displayName?: string;
  value: string;
}

export class Base {
  id?: string | number;
  name?: string;
}

export class Localization {
  country_name: string;
  country_code_alpha_2: string;
  country_code_alpha_3?: string;
  country_code_numeric?: number;
  country_dial_code: string;
  country_dial_code_prefix?: string;
  country_flag?: string;
  language_code: string;
  language_name: string;
}

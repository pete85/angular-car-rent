import {Vehicle} from "./vehicle";

export class Tile {
  border?: string;
  borderBottom?: string;
  borderColor?: string;
  borderLeft?: string;
  borderRight?: string;
  borderTop?: string;
  class?: string;
  color?: string;
  cols: number;
  rows: number;
  title: string;
  subTitle?: string;
  linkUrl?: string;
  image?: string;
  vehicle?: Vehicle;
}

import {Latlng} from "./IPoint";

export interface IFlowPoint {
  name: string;
  type: string;
  zone: string;
  point: Latlng | null;
}

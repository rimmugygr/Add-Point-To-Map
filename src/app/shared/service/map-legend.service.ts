import { Injectable } from '@angular/core';

import * as flowZone from '../model/flow-zone.json';
import {IFlowZone} from "../model/IFlowZone";

import * as flowType from '../model/flow-type.json';
import {IFlowType} from "../model/IFlowType";

@Injectable({
  providedIn: 'root'
})
export class MapLegendService {

  constructor() { }

  getFlowType(): IFlowType[] {
    return (flowType as any).default;
  }

  getFlowZone(): IFlowZone[] {
    return (flowZone as any).default;
  }

  // get type setting for marker
  dataTypeBindingToLegend(typeName: string): any {
    const legend: IFlowType[] = this.getFlowType();

    const colorLegendByName = legend
      .filter(x => x.name == typeName)
      .pop()
    if (colorLegendByName) return colorLegendByName.color
  }

  // get zone setting for marker
  dataZoneBindingToLegend(zoneValue: string): any {
    const legend: IFlowZone[] = this.getFlowZone();

    // find color in case where zone value is string
    if (isNaN(parseInt(zoneValue))) {
      const colorLegendByStringName = legend
        .filter(x => x.name == zoneValue)
        .pop()
      if (colorLegendByStringName) return colorLegendByStringName.color
    }

    // find closest number in legend
    const closestValueFromLegend: string = legend
      .filter( x => !isNaN(parseInt(x.name)))
      .map(x => parseInt(x.name))
      .reduce((prev, curr) => Math.abs(curr - parseInt(zoneValue)) < Math.abs(prev - parseInt(zoneValue)) ? curr : prev)
      .toString();

    // find case where closed number in legend
    const colorLegendByClosestNumber = legend
      .filter(x => x.name == closestValueFromLegend)
      .pop();
    if (colorLegendByClosestNumber) return colorLegendByClosestNumber.color
  }
}

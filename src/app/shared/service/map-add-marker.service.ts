import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import {IFlowPoint} from "../model/IFlowPoint";

@Injectable({
  providedIn: 'root'
})
export class MapAddMarkerService {
  private pointAdded = new Subject<boolean>();
  pointAdded$ = this.pointAdded.asObservable();

  private pointAccepted = new Subject<boolean>();
  pointAccepted$ = this.pointAccepted.asObservable();

  private newPointData = new Subject<IFlowPoint>();
  newPointData$ = this.newPointData.asObservable();

  private pointAddCancel = new Subject<boolean>();
  pointAddCancel$ = this.pointAddCancel.asObservable();

  constructor() { }

  emmitNewPointData(point: IFlowPoint | any) {
    this.newPointData.next(point);
  }

  emmitFlagPointAddedToMap() {
    this.pointAdded.next(true);
  }

  emmitFlagPointAccepted() {
    this.pointAccepted.next(true);
  }

  emitFlagPointAddCancel() {
    this.pointAddCancel.next(true);
  }

}

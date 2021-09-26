import { Component, OnInit } from '@angular/core';
import {IFlowZone} from "../../../../shared/model/IFlowZone";
import {MapLegendService} from "../../../../shared/service/map-legend.service";


@Component({
  selector: 'app-legend-zone',
  templateUrl: './legend-zone.component.html',
  styleUrls: ['./legend-zone.component.css']
})
export class LegendZoneComponent implements OnInit {
  public flowZoneList: IFlowZone[];

  constructor(private service: MapLegendService) { }

  ngOnInit(): void {
    this.flowZoneList = this.service.getFlowZone();
  }

}

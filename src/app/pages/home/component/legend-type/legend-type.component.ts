import { Component, OnInit } from '@angular/core';
import {MapLegendService} from "../../../../shared/service/map-legend.service";
import {IFlowType} from "../../../../shared/model/IFlowType";

@Component({
  selector: 'app-legend-type',
  templateUrl: './legend-type.component.html',
  styleUrls: ['./legend-type.component.css']
})
export class LegendTypeComponent implements OnInit {
  public flowTypeList: IFlowType[];

  constructor(private service: MapLegendService) { }

  ngOnInit(): void {
    this.flowTypeList = this.service.getFlowType();
  }

}

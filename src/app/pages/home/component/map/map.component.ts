import {AfterViewInit, Component} from '@angular/core';

import * as Leaflet from 'leaflet';
import {MapAddMarkerService} from "../../../../shared/service/map-add-marker.service";
import {IPoint} from "../../../../shared/model/IPoint";
import {Subscription} from "rxjs";
import {IFlowPoint} from "../../../../shared/model/IFlowPoint";
import {MapLegendService} from "../../../../shared/service/map-legend.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map: any;
  private actualMarker: any;

  private newPointData: IFlowPoint | any;
  private subscriptionNewPointData: Subscription;
  private subscriptionPointAccepted: Subscription;
  private subscriptionPointCancel: Subscription;

  constructor(private mapAddMarkerService: MapAddMarkerService,
              private mapLegendService: MapLegendService) { }

  ngAfterViewInit(): void {
    // receive new data point from form
    this.subscriptionNewPointData = this.mapAddMarkerService.newPointData$.subscribe(pointData => {
      this.newPointData = pointData;
    })
    // receive from form that point is accepted
    this.subscriptionPointAccepted = this.mapAddMarkerService.pointAccepted$.subscribe( p => {
      console.log("Point add to map, now can save point in data base")
      console.log(this.newPointData)
      this.actualMarker = null;
      this.newPointData = null;
    })
    // receive from form that point is cancel
    this.subscriptionPointCancel = this.mapAddMarkerService.pointAddCancel$.subscribe( p => {
      if(this.actualMarker) {
        this.actualMarker.remove(this.map);
      }
      this.actualMarker = null;
      this.newPointData = null;
    })
    this.initOnClick();
  }

  private initOnClick(): void {

    this.map = Leaflet.map('map', {
      center: [ 52, 20 ],
      zoom: 7
    });

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.map.on("click", (actualPoint: IPoint) => {
      // when data from form received
      if (this.newPointData) {

        // remove old marker if it exist because he is not accepted
        if(this.actualMarker) {
          this.actualMarker.remove(this.map);
        }

        // save actual coordinate
        this.newPointData.point = actualPoint.latlng;

        // get marker settings from legend
        const colorZone: string = this.mapLegendService.dataZoneBindingToLegend(this.newPointData.zone);
        const colorType: string = this.mapLegendService.dataTypeBindingToLegend(this.newPointData.type);

        // make new marker
        this.actualMarker = Leaflet.circleMarker(
          [actualPoint.latlng.lat, actualPoint.latlng.lng],
          {color: colorType, weight:5, fillColor: colorZone, fillOpacity: 1});

        // make popup
        this.actualMarker.bindPopup("<b>" + this.newPointData.name + "</b><br>"
          + this.newPointData.type + "<br> Przepływ: " + this.newPointData.zone + "m3/dzień");
        console.log("Point selected on map:")
        console.log(actualPoint.latlng);

        // add the marker to map
        this.actualMarker.addTo(this.map);
        // emit to form
        this.mapAddMarkerService.emmitFlagPointAddedToMap();
      }
    });

  }

  ngOnDestroy() {
    this.subscriptionNewPointData.unsubscribe();
    this.subscriptionPointAccepted.unsubscribe();
  }
}

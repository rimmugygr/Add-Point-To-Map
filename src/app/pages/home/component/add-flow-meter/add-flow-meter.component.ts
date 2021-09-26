import { Component, OnInit } from '@angular/core';
import {MapLegendService} from "../../../../shared/service/map-legend.service";
import {IFlowType} from "../../../../shared/model/IFlowType";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MapAddMarkerService} from "../../../../shared/service/map-add-marker.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-flow-meter',
  templateUrl: './add-flow-meter.component.html',
  styleUrls: ['./add-flow-meter.component.css']
})
export class AddFlowMeterComponent implements OnInit {
  flowTypeList: IFlowType[];
  form: FormGroup;
  isAddPointButton: boolean = true;
  isAcceptedButton: boolean = false;

  private subscriptionNewPointData: Subscription;

  constructor(private mapLegendService: MapLegendService,
              private mapAddMarkerService: MapAddMarkerService) { }

  ngOnInit(): void {
    this.subscriptionNewPointData = this.mapAddMarkerService.pointAdded$.subscribe(p => {
      this.isAddPointButton = false;
      this.isAcceptedButton = true;
    })

    this.flowTypeList = this.mapLegendService.getFlowType();
    this.initForm();
  }

  submitForm(): void {
    if (!this.form.invalid) {
      let data = this.form.value
      if (data.zone == null || data.zone == "") data.zone = "brak"
      this.mapAddMarkerService.emmitNewPointData({name: data.name , point: null, type: data.type, zone: data.zone});
    }
  }

  acceptPoint(): void {
    this.mapAddMarkerService.emmitFlagPointAccepted();
    this.resetForm();


  }

  resetAddPoint() {
    this.resetForm();
    this.mapAddMarkerService.emitFlagPointAddCancel();
  }

  ngOnDestroy() {
    this.subscriptionNewPointData.unsubscribe();
  }

  private initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      zone: new FormControl(null,
        [Validators.pattern("[0-9]*"), Validators.min(0), Validators.max(100)])
    });
  }

  private resetForm() {
    this.form.reset();
    // reset errors
    Object.keys(this.form.controls).forEach(key => {
      // @ts-ignore
      this.form.get(key).setErrors(null);
    });
    this.isAcceptedButton = false;
    this.isAddPointButton = true;
  }

}


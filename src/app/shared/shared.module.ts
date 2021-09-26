import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFlowMeterComponent } from '../pages/home/component/add-flow-meter/add-flow-meter.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import { LegendZoneComponent } from '../pages/home/component/legend-zone/legend-zone.component';
import { LegendTypeComponent } from '../pages/home/component/legend-type/legend-type.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AddFlowMeterComponent,
    LegendZoneComponent,
    LegendTypeComponent
  ],
  exports: [
    AddFlowMeterComponent,
    LegendTypeComponent,
    LegendZoneComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatExpansionModule,
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

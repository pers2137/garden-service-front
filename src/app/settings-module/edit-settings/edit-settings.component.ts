import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SzchedulerDeleteRecord } from 'src/app/electrovalve-list/electrovalve-list.component';
import { ShedulerAddModel } from 'src/app/models/shedulerAddModel.model';
import { StationSettings } from 'src/app/models/stationSettings.model';
import { StationService } from 'src/app/services/station-service.service';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import { SaveSnackBarComponent } from './save-snack-bar/save-snack-bar.component';



@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss']
})
export class EditSettingsComponent implements OnInit {

  disabled = false;
  thumbLabel = true;
  showTicks = false;

  max = 120;
  min = 1;
  step = 1;

  value = 30;


  parentEmitter = new EventEmitter<[]>();

  station!: StationSettings;
  notFound: boolean = false;
  error: boolean = false;
  userName: string = "test";
  public errors: any = [];
  public success: any = [];

  constructor(private route: ActivatedRoute,
              public stationService: StationService,
              private _snackBar: MatSnackBar) {}

  ngOnInit() {
    if(this.route.snapshot.data[0] === "NOT_FOUND") {
      this.notFound = true;
    } else if (this.route.snapshot.data[0] === "UNEXPECTED_ERROR") {
      this.error = true;
    } else {
      this.station = this.route.snapshot.data[0];
    }
  }

  save() {
      this.stationService.saveStationSettings(this.station).subscribe(
        resData => {
          console.log(resData);
          this._snackBar.openFromComponent(SaveSnackBarComponent, {
            duration: 2500,
          });
          this.parentEmitter.emit();
        },
        errorMessage => {
          console.log(errorMessage);
        }
    );
  }

  addScheduler(model: ShedulerAddModel) {
    this.station.valvesList.forEach( valve => {
      if(valve.pin === model.pinNumber) {
        valve.schedulesList.push({
                                uuid: model.uuid,
                                id: undefined,
                                minuteStart: model.minuteStart,
                                hourStart: model.hourStart,
                                minuteStop: model.minuteStop,
                                hourStop: model.hourStop,
                                dayOfWeek: model.dayNumber
                          });
      }
    })
  }

  deleteScheduler(model: SzchedulerDeleteRecord) {

    var valveIndex = this.station.valvesList.findIndex( it => it.pin == model.pin);
    var schedulerIndex;
    if(model.id !== undefined) {
       schedulerIndex = this.station.valvesList[valveIndex].schedulesList
                             .findIndex( it => it.id == model.id )
    } else {
       schedulerIndex = this.station.valvesList[valveIndex].schedulesList
                             .findIndex( it => it.uuid == model.uuid )
    }
    this.station.valvesList[valveIndex].schedulesList.splice(schedulerIndex, 1);
  }



}

import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StationService } from '../services/station-service.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface StationList {
  stationListElement: [{
    id: number;
    name: string;
  }]
};

export interface ChartData {
  chartDataA: {
    sensorData: [{
      sensorId: string;
      measurementsForSensorList: [{
        value: number;
        timestamp: number;
      }]
    }];
    measurementType: string;
  },
  chartDataB: {
    sensorData: [{
      sensorId: string;
      measurementsForSensorList: [{
        value: number;
        timestamp: number;
      }]
    }];
    measurementType: string;
  }
};


interface SensorsType {
  type: string;
  description: string;
}

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {


  sensorsType: SensorsType[] = [
    {type: 'S', description: 'Czujnik nasłonecznienia'},
    {type: 'SH', description: 'Czujnik wilgotnośći gleby'},
    {type: 'DS', description: 'Czujnik ds18b20'},
    {type: 'DHT', description: 'Czujnik temperatury i wilgotności powietrza'},
  ];

  parentEmitter = new EventEmitter<[]>();
  parentEmitterUpdateData = new EventEmitter<any>();


  parentEmitter_chart2 = new EventEmitter<[]>();
  parentEmitterUpdateData_chart2 = new EventEmitter<any>();



  startDate = new Date();
  endDate = new Date();
  stationList: any = [];
  chartData: ChartData;
  selectedStationId: number;
  typ: string;
  firstChange = false;

  presentedStationId: number;
  presentedTyp: string;
  presentedStartDate = new Date();
  presentedEndDate = new Date();

  sensorsGroup: FormGroup;
  sensorsGroup_chart2: FormGroup;

  constructor(private formBuilder: FormBuilder, private stationService: StationService) {
    this.sensorsGroup = this.formBuilder.group({
      selectCtrl: [false],
    });

    this.sensorsGroup_chart2 = this.formBuilder.group({
      selectCtrl: [false],
    });
  }

  ngOnInit() {
    this.firstChange = false;
    this.stationService.getStationsList().subscribe(
      resData => {
        this.stationList = resData.stationListElement;
      },
      errorMessage => {
        console.log(errorMessage);
      });
    }


  inputChange() {
    if(this.firstChange == true) return;
    this.getMeasurementsData();
    // this.parentEmitterUpdateData.emit(this.chartData.chartDataA.sensorData);
    // this.emitChangeSensor();
    this.firstChange = true;
  }



  updateData() {

    if(this.presentedStationId != this.selectedStationId ||
      this.presentedTyp != this.typ ||
      this.presentedStartDate != this.startDate ||
      this.presentedEndDate != this.endDate) {
      this.getMeasurementsData();
    } else {

      this.emitChangeSensor();
    }
  }


  private getMeasurementsData() {

    this.stationService.getMeasurements(this.selectedStationId, this.typ,  this.startDate, this.endDate).subscribe(
      resData => {
          this.chartData = resData;
          console.log(this.chartData);

          var sensorNumber = 0;
          if(this.chartData == null) return;
          this.chartData.chartDataA.sensorData.forEach(
            sensor => {
              this.formBuilder.group(this.sensorsGroup);
              this.sensorsGroup.addControl(sensorNumber.toString(), this.formBuilder.control(''))
              this.sensorsGroup.controls[sensorNumber].setValue(true);
              sensorNumber++;
          }
          )
          this.sensorsGroup.updateValueAndValidity();


          this.presentedStationId = this.selectedStationId;
          this.presentedTyp = this.typ;
          this.presentedStartDate = this.startDate;
          this.presentedEndDate = this.endDate;

          this.parentEmitterUpdateData.emit(this.chartData.chartDataA);



          if(this.presentedTyp == "DHT") {
            sensorNumber = 0;
            this.chartData.chartDataB.sensorData.forEach(
              sensor => {
                this.formBuilder.group(this.sensorsGroup_chart2);
                this.sensorsGroup_chart2.addControl(sensorNumber.toString(), this.formBuilder.control(''))
                this.sensorsGroup_chart2.controls[sensorNumber].setValue(true);
                sensorNumber++;
            }
            )
            this.sensorsGroup_chart2.updateValueAndValidity();
            this.parentEmitterUpdateData_chart2.emit(this.chartData.chartDataB);
          }
          this.emitChangeSensor();
      },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  private emitChangeSensor() {
    var sensorTab: any = [];
    if(this.chartData == null) return;
    for (let i = 0; i < this.chartData.chartDataA.sensorData.length; i++) {
      sensorTab.push(this.sensorsGroup.controls[i].value == true)
    }
    this.parentEmitter.emit(sensorTab);

    if(this.presentedTyp == "DHT") {
        var sensorTab_2: any = [];
        if(this.chartData == null) return;
        for (let i = 0; i < this.chartData.chartDataB.sensorData.length; i++) {
          sensorTab_2.push(this.sensorsGroup_chart2.controls[i].value == true)
        }
        this.parentEmitter_chart2.emit(sensorTab_2);
    }

  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-analog-sensor-table',
  templateUrl: './analog-sensor-table.component.html',
  styleUrls: ['./analog-sensor-table.component.scss']
})
export class AnalogSensorTableComponent implements OnInit{

    @Input() analogList: [{
      inputLine: number;
      humidity: number;
      insolation: number;
      lastMeasurement: number; //timestamp
      active: boolean
    }];


    ngOnInit() {
      this.analogList.forEach(element => {
        var date = new Date(element.lastMeasurement,).toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit',  hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
        this.analogSensorListTab.push({
          numerLini: element.inputLine,
          isActive: element.active == true ? "Tak" : "Nie",
          lastMeasurements_sun: element.insolation,
          lastMeasurements_humidity: element.humidity, //timestamp
          lastMeasurementDate: date,
        })
        // analogList
      });
    }

   analogSensorListTab: any = [ ];  
   displayedColumnsValvesTyp_2: string[] = ['numerLini', 'isActive', "lastMeasurements_humidity","lastMeasurements_sun", "lastMeasurementDate"];
   dataSourceValvesTyp_2 = this.analogSensorListTab;

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-sensor-table',
  templateUrl: './digital-sensor-table.component.html',
  styleUrls: ['./digital-sensor-table.component.scss']
})
export class DigitalSensorTableComponent implements OnInit{

  @Input() dht11InformationList: [{
    inputLine: number;
    temperature: number;
    airHumidity: number;
    lastMeasurement: number; //timestamp
    active: boolean
  }];

  @Input() ds18b20InformationList: [{
    address: number;
    temperature: number;
    lastMeasurement: number; //timestamp
    active: boolean
  }];


  ngOnInit() {
    console.log(this.dht11InformationList);
    this.dht11InformationList.forEach(element => {
      var date = new Date(element.lastMeasurement,).toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit',  hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
        this.dht11InformationListTab.push({
          inputLine: element.inputLine,
          lastMeasurements_temp: element.temperature,
          lastMeasurements_humidity: element.airHumidity,
          lastMeasurementDate: date, //timestamp
          isActive: element.active == true ? "Tak" : "Nie",
        })
     })

     this.ds18b20InformationList.forEach(element => {
      var date = new Date(element.lastMeasurement,).toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit',  hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
        this.ds18b20InformationListTab.push({
          address: element.address,
          lastMeasurements: element.temperature,
          lastMeasurementDate: date, //timestamp
          isActive: element.active == true ? "Tak" : "Nie",
        })
     })
  }
  
    //TYP1 - ds18b20
    ds18b20InformationListTab: any = [ ];  
    displayedColumnsValves: string[] = ['address', 'isActive', "lastMeasurements", "lastMeasurementDate"];
    dataSourceValves = this.ds18b20InformationListTab;


    //TYP4 -ds18b20
    dht11InformationListTab: any = [ ];  
    displayedColumnsValvesTyp_4: string[] = ['inputLine', 'isActive', "lastMeasurements_temp", "lastMeasurements_humidity", "lastMeasurementDate"];
    dataSourceValvesTyp_4 = this.dht11InformationListTab;

}

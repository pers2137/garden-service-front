import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


export interface StationInformation {
  stationName: string;
  systemVersion: string;
  registrationDate: string;
  addressMac: string;
  addressIp: string;
  valvesInformationList: [{
    pin: string;
    operationMode: string;
  }];
  dht11InformationList: [{
    inputLine: number;
    temperature: number;
    airHumidity: number;
    lastMeasurement: number; //timestamp
    active: boolean
  }];
  analogSensorInformationList: [{
    inputLine: number;
    humidity: number;
    insolation: number;
    lastMeasurement: number; //timestamp
    active: boolean
  }];
  ds18b20InformationList: [{
    address: number;
    temperature: number;
    lastMeasurement: number; //timestamp
    active: boolean
  }];


}


export interface StationInformationTab {
  name: string;
  value: string;
}

const ELEMENT_DATA: StationInformationTab[] = [];




@Component({
  selector: 'app-information-station',
  templateUrl: './information-station.component.html',
  styleUrls: ['./information-station.component.scss']
})
export class InformationStationComponent {

  notFound: boolean = false;
  error: boolean = false;
  stationInformation: StationInformation;

   constructor(private route: ActivatedRoute) {}

   ngOnInit() {
    console.log("test");
    console.log(this.route.snapshot.data[0])
    if(this.route.snapshot.data[0] === "NOT_FOUND") {
      this.notFound = true;
    } else if (this.route.snapshot.data[0] === "UNEXPECTED_ERROR") {
      this.error = true;
    } else {
       this.stationInformation = this.route.snapshot.data[0];
       console.log(this.stationInformation);
    }

    while(ELEMENT_DATA.length != 0) {
      ELEMENT_DATA.pop()
    }
    const date = new Date(this.stationInformation.registrationDate).toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit',  hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
    // var dateString = date.getDate + "-" + date.getHours + "-" + date.getMinutes
    // | date: 'yyyy-MM-dd  hh-mm-ss'
    ELEMENT_DATA.push({name: 'Nazwa stacji', value: this.stationInformation.stationName});
    ELEMENT_DATA.push({name: 'Adres mac', value: this.stationInformation.addressMac});
    ELEMENT_DATA.push({name: 'Ip stacji', value: this.stationInformation.addressIp});
    ELEMENT_DATA.push({name: 'Wersja oprogramowania', value: this.stationInformation.systemVersion});
    ELEMENT_DATA.push({name: 'Data rejestracji', value: date});

  }

  //INFORMACJE
  displayedColumns: string[] = ['name', 'value'];
  dataSource = ELEMENT_DATA;
}

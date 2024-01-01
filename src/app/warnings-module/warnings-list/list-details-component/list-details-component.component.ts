import { Component, Input, OnInit } from '@angular/core';


export interface WarningsInformationTab {
  name: string;
  value: string;
}

const ELEMENT_DATA: WarningsInformationTab[] = [];


@Component({
  selector: 'app-list-details-component',
  templateUrl: './list-details-component.component.html',
  styleUrls: ['./list-details-component.component.scss']
})
export class ListDetailsComponentComponent implements OnInit{

  @Input() content: any;

  

  ngOnInit() {
    var tresholdString;

    if(this.content.belowThreshold === true) tresholdString = "Mniejsza"; else tresholdString = "Większa";
    
    while(ELEMENT_DATA.length != 0) {
      ELEMENT_DATA.pop()
    }
    var sensorTypeName = ""
    if(this.content.measurementType == "AIR_TEMP") sensorTypeName = "Temperatura powietrza"
    if(this.content.measurementType == "INSOLATION") sensorTypeName = "Nasłonecznienie"
    if(this.content.measurementType == "SOIL_HUMIDITY") sensorTypeName = "Wilgotność gleby"
    if(this.content.measurementType == "AIR_HUMIDITY") sensorTypeName = "Wilgotność powietrza"

    ELEMENT_DATA.push({name: 'Typ pomiaru', value: sensorTypeName});
    ELEMENT_DATA.push({name: 'Wartość progowa', value: this.content.thresholdValue});
    ELEMENT_DATA.push({name: 'Powiadom gdy mierzona wartość jest', value: tresholdString});
  }


  //INFORMACJE
  displayedColumns: string[] = ['name', 'value'];
  dataSource = ELEMENT_DATA;


}

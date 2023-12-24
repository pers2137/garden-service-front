import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-valves-table',
  templateUrl: './valves-table.component.html',
  styleUrls: ['./valves-table.component.scss']
})
export class ValvesTableComponent implements OnInit{

  @Input() valvesList: [{
    pin: string;
    operationMode: string;
  }]

  ngOnInit() {
    var counter = 1;
    var object = {col_1: "", col_1_status: "", 
                  col_2: "", col_2_status: "",
                  col_3: "", col_3_status: "",
                  col_4: "", col_4_status: ""
                };
    this.valvesList.forEach(it => {
          if(counter == 1) {
            object.col_1 = it.pin
            object.col_1_status = it.operationMode
          } else if (counter == 2) {
            object.col_2 = it.pin
            object.col_2_status = it.operationMode
          } else if (counter == 3) {
            object.col_3 = it.pin
            object.col_3_status = it.operationMode
          } else if (counter == 4) {
            object.col_4 = it.pin
            object.col_4_status = it.operationMode
            counter = 0;
            this.valvesInformationTab.push(object);
            object = {col_1: "", col_1_status: "", 
                      col_2: "", col_2_status: "",
                      col_3: "", col_3_status: "",
                      col_4: "", col_4_status: ""
                    };
          }
          counter++;
    })

    
  }

    valvesInformationTab: any = [];
    //ELEKTROZAWORY
    displayedColumnsValves: string[] = ['valves_1', 'valves_2', "valves_3", "valves_4"];
    dataSourceValves = this.valvesInformationTab;

}

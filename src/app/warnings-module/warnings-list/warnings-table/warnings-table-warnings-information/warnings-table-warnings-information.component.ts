import { Component, Input } from '@angular/core';





@Component({
  selector: 'app-warnings-table-warnings-information',
  templateUrl: './warnings-table-warnings-information.component.html',
  styleUrls: ['./warnings-table-warnings-information.component.scss']
})
export class WarningsTableWarningsInformationComponent {


  @Input() warningList:  { 
      timestamp: number;
      sensorAddressList: string[];
    }[]
}

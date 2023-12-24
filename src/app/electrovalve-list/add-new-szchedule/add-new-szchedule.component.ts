import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ShedulerAddModel } from 'src/app/models/shedulerAddModel.model';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-new-szchedule',
  templateUrl: './add-new-szchedule.component.html',
  styleUrls: ['./add-new-szchedule.component.scss']
})
export class AddNewSzcheduleComponent {

  @Input() pinNumber: number;
  @Output() addSchedulerEvent = new EventEmitter<ShedulerAddModel>();

  dayNumber: number;
  hourStart: number;
  minuteStart: number;
  hourStop: number;
  minuteStop: number;

  saveNew() {
    if(this.dayNumber === undefined || 
       this.hourStart === undefined || 
       this.minuteStart === undefined ||
       this.hourStop === undefined ||
       this.minuteStop === undefined) {
          return;
      }

      const uuid = uuidv4();

      this.addSchedulerEvent.emit({
          uuid: uuid,
          pinNumber: this.pinNumber,
          dayNumber: this.dayNumber, 
          hourStart: this.hourStart, 
          minuteStart: this.minuteStart, 
          hourStop: this.hourStop,
          minuteStop: this.minuteStop
        }
      );
  }

  hourNumber: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  minuteNumber: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];


}

import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { empty } from 'rxjs';
import { ShedulerAddModel } from '../models/shedulerAddModel.model';

interface ValvesStatus {
  value: string;
  viewValue: string;
}



export interface SzchedulerDeleteRecord {
  pin: number, 
  id: any, 
  uuid: string
}

@Component({
  selector: 'app-electrovalve-list',
  templateUrl: './electrovalve-list.component.html',
  styleUrls: ['./electrovalve-list.component.scss']
})
export class ElectrovalveListComponent implements OnInit {

  constructor(){
    
  }

  ngOnInit() {
    console.log(this.valvesList);
  }

  @Output() addSchedulerEvent = new EventEmitter<ShedulerAddModel>();
  @Output() deleteSchedulerEvent = new EventEmitter<SzchedulerDeleteRecord>();

  @Input() valvesList: [{
    pin: number;
    operationMode: string;
    enableHigh: boolean;
    schedulesList: [{
      uuid: string,
      id?: number,
      minuteStart: number,
      hourStart: number,
      minuteStop: number,
      hourStop: number,
      dayOfWeek: number
    }];
  }];

  panelOpenState = false;  
  isChecked: boolean = false;

  schedulerChange = [
    false,false,false,false,
    false,false,false,false,
    false,false,false,false,
    false,false,false,false
  ]

  valvesStatus: ValvesStatus[] = [
    {value: 'OFF', viewValue: 'OFF'},
    {value: 'ON', viewValue: 'ON'},
    {value: 'AUTO', viewValue: 'AUTO'},
  ];

  dayList = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela' ];

  addScheduler(model: ShedulerAddModel) {
    this.schedulerChange[model.pinNumber] = true;
    this.addSchedulerEvent.emit(model);
  }

  deleteShedule(pin: number, id: any, uuid: string) {
    this.schedulerChange[pin] = true;
    this.deleteSchedulerEvent.emit({
      pin: pin, 
      id: id, 
      uuid: uuid
    });
  }

  markAsChanged(pin: number) {
    this.schedulerChange[pin] = true;
  }
}

import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Subscription, empty } from 'rxjs';
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
export class ElectrovalveListComponent implements OnInit, OnDestroy {

  constructor(){}

  ngOnInit() {
    this.subscribeToParentEmitter();
  }

  ngOnDestroy(): void { 
    this.subscription.unsubscribe(); 
  } 

  @Input() eventEmitter: EventEmitter<any>; 
  private subscription: Subscription; 

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

  schedulerChange = Array(16).fill(false);

  valvesStatus: ValvesStatus[] = [
    {value: 'OFF', viewValue: 'Na stałe wyłączony'},
    {value: 'ON', viewValue: 'Na stałe włączony'},
    {value: 'AUTO', viewValue: 'Sterowany wg harmonogramu'},
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

  subscribeToParentEmitter(): void { 
    this.subscription = this.eventEmitter.subscribe((data: any) => {
      this.schedulerChange = Array(16).fill(false);
     })
  }
}

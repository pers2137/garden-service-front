export interface Valve {
    pin: number;
    operationMode: string;
    enableHigh: number;
    schedulesList: [{
      id: number,
      minuteStart: number,
      hourStart: number,
      minuteStop: number,
      hourStop: number,
      dayOfWeek: number
    }];
  }
  
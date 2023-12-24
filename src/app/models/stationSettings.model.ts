export interface StationSettings { 
      id: number;
      name: string;
      macAddress: string;
      measurementPeriod: number;
      valvesList: [{
        pin: number;
        operationMode: string;
        enableHigh: boolean;
        schedulesList: [{
          uuid: string,
          id?: number,
          minuteStart: number;
          hourStart: number;
          minuteStop: number;
          hourStop: number;
          dayOfWeek: number;
        }];
      }]
  };
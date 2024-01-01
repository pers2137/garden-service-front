import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Valve } from '../models/valve.model';
import { StationSettings } from '../models/stationSettings.model';

export interface StationListResponse { 
  stationListElement: [{
    id: number;
    name: string;
  }]
};

export interface StationInformationResponse { 
  stationListElement:{
    id: number;
    name: string;
  }
};

export interface StationSettingsResponse { 
    id: number;
    name: string;
    macAddress: string;
    measurementPeriod: number;
    valvesList: Valve[];
};

export interface StationMeasurementsDataResponse { 
  chartDataA: {
    sensorData: [{
      sensorId: string;
      measurementsForSensorList: [{
        value: number;
        timestamp: number;
      }]
    }];
    measurementType: string;
  },
  chartDataB: {
    sensorData: [{
      sensorId: string;
      measurementsForSensorList: [{
        value: number;
        timestamp: number;
      }]
    }];
    measurementType: string;
  }
};

export interface SensorList {
  sList: string[];
  shList: string[];
  dhtList: string[];
  dsList: string[];
}


@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

  getStationsList() {
    return this.http.get<StationListResponse>(
      'http://' + environment.host + ':' + environment.port + '/api/station/get/list'
    );
  }

  getStationInformation(id: number) {
    return this.http.get<StationInformationResponse>(
      'http://' + environment.host + ':' + environment.port + '/api/station/details/information/' + id
    );
  }

  getStationBasicInformation(id: number) {
    return this.http.get<StationInformationResponse>(
      'http://' + environment.host + ':' + environment.port + '/api/station/basic/information/' + id
    );
  }

  getStationSettings(id: number) {
    return this.http.get<StationSettingsResponse>(
      'http://' + environment.host + ':' + environment.port + '/api/station/settings/get/' + id
    );
  }

  getSensorList(id: number) {
    return this.http.get<StationSettingsResponse>(
      'http://' + environment.host + ':' + environment.port + '/api/station/sensor/list/' + id
    );
  }

  getMeasurements(id: number, sensorType: string, startDate: Date, endDate: Date) {
    var requestObject = {
      sensorType: sensorType,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    }
    
    return this.http.post<StationMeasurementsDataResponse>(
      'http://' + environment.host + ':' + environment.port + '/api/measurements/data/' + id, 
      requestObject
    );
  }

  saveStationSettings(settings: StationSettings) {

    var valvesRequestObject = settings.valvesList.map( it => {
        var schedulesList = it.schedulesList.map(it =>  {
                                return {
                                        id: it.id,
                                        minuteStart: it.minuteStart,
                                        hourStart: it.hourStart,
                                        minuteStop: it.minuteStop,
                                        hourStop: it.hourStop,
                                        dayOfWeek: it.dayOfWeek
                                      }
                              }
                            );

        return {
                pin: it.pin,
                operationMode: it.operationMode,
                enableHigh: it.enableHigh,
                schedulesList: schedulesList
              };
    })

    var requestObject = {
      name: settings.name,
      macAddress: settings.macAddress,
      measurementPeriod: settings.measurementPeriod,
      valvesList: valvesRequestObject
    }
    return this.http.post<StationSettingsResponse>(
      'http://' + environment.host + ':' + environment.port + '/api/station/settings/' + settings.id +"/save",
      requestObject
    );
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


export interface WarningResponseList { 
  warningResponseList: [{
    warningId: number;
    name: string;
    criterion: string;
    measurementType: string;
    thresholdValue: number;
    belowThreshold: boolean;
    sensorAddressList: string[];
    warningInformationList: [{
      timestamp: number;
      sensorAddressList: string[];
    }]
  }]
};

export interface WarningDetailResponse { 
    stationName: string;
    normName: string;
    measurementType: string;
    criterion: string;
    threshold: number;
    belowThreshold: boolean;
    sensorAddress: string[];
};


@Injectable({
  providedIn: 'root'
})
export class WarningsServiceService {

  constructor(private http: HttpClient) { }

  saveNewWarning(stationId: number, 
                 name: string, 
                 measurementType: string, 
                 criterion: string, 
                 thresholdValue: number,
                 belowThreshold: boolean,
                 sensorAddress: string[]) {
  
    var requestObject = {
      stationId: stationId,
      name: name,
      measurementType: measurementType, 
      criterion: criterion, 
      thresholdValue: thresholdValue,
      belowThreshold: belowThreshold,
      sensorAddress: sensorAddress
    }
    
    return this.http.post<any>(
      'http://' + environment.host + ':' + environment.port + '/api/warnings/add', 
      requestObject
    );
  }

  getWarningsListForStation(id: number) {
    return this.http.get<WarningResponseList>(
      'http://' + environment.host + ':' + environment.port + '/api/warnings/list/station/' + id
    );
  }

  deleteWarning(id: number) {
    return this.http.delete(
      'http://' + environment.host + ':' + environment.port + '/api/warnings/delete/' + id
    );
  }

  getWarningDetail(id: number, warningId: number) {
    return this.http.get<WarningDetailResponse>(
      'http://' + environment.host + ':' + environment.port + '/api/warnings/' + warningId+ '/station/' + id
    );
  }

  editWarning(stationId: number, 
              warningId: number,
              name: string, 
              measurementType: string, 
              criterion: string, 
              thresholdValue: number,
              belowThreshold: boolean,
              sensorAddress: string[]) {

    var requestObject = {
      stationId: stationId,
      warningId: warningId,
      name: name,
      measurementType: measurementType, 
      criterion: criterion, 
      thresholdValue: thresholdValue,
      belowThreshold: belowThreshold,
      sensorAddress: sensorAddress
    }

    return this.http.post<any>(
      'http://' + environment.host + ':' + environment.port + '/api/warnings/edit', 
    requestObject
    );
  }

  getWarningList(warningId: number, page: number) {

  return this.http.post<any>(
  'http://' + environment.host + ':' + environment.port + '/api/warnings/'+ warningId+'/occurrences/list?page=' + page, null
  );}

}

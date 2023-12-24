import { Injectable } from '@angular/core';
import { Station } from '../models/station.model';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { StationService } from './station-service.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsResolverService implements Resolve<any> {

  constructor(private stationService: StationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    console.log(route.paramMap.get('id'));
    var id = route.paramMap.get('id');
    return this.stationService.getStationSettings(Number(id)).pipe(catchError((error) => {
      console.log(error);
      if(error.error.code == "station.not-found") {
        return of("NOT_FOUND");
      } else {
        return of("UNEXPECTED_ERROR");
      }
      
    })); 
  }

}

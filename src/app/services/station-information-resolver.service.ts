import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { StationService } from './station-service.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationInformationResolverService implements Resolve<any>{

  
  constructor(private stationService: StationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    console.log(route.paramMap.get('id'));
    var id = route.paramMap.get('id');
    return this.stationService.getStationInformation(Number(id)).pipe(catchError((error) => {
      console.log(error);
      if(error.error.code == "station.not-found") {
        return of("NOT_FOUND");
      } else {
        return of("UNEXPECTED_ERROR");
      }
      
    })); 
  }
}

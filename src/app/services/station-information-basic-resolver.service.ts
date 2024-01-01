import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { StationService } from './station-service.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationInformationBasicResolverService implements Resolve<any> {

  constructor(private stationService: StationService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    console.log(route.paramMap.get('id'));
    var id = route.paramMap.get('id');
    return this.stationService.getStationBasicInformation(Number(id)).pipe(catchError((error) => {
      console.log(error);
      console.log(error);
      this.router.navigate(['404']);
      return "error";
      
    })); 
  }
}

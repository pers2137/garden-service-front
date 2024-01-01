import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { StationService } from './station-service.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorResolverService implements Resolve<any> {

  constructor(private stationService: StationService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    var id = route.paramMap.get('id');
    return this.stationService.getSensorList(Number(id)).pipe(catchError((error) => {
      console.log(error);
      this.router.navigate(['404']);
      return "error";
      
    })); 
  }
}

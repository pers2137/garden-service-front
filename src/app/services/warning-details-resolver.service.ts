import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { WarningsServiceService } from './warnings-service.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarningDetailsResolverService implements Resolve<any> {

  constructor(private warningService: WarningsServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    var id = route.paramMap.get('id');
    var warningId = route.paramMap.get('warningId');
    return this.warningService.getWarningDetail(Number(id), Number(warningId)).pipe(catchError((error) => {
      console.log(error);
      if(error.error.code == "station.not-found") {
        return of("NOT_FOUND");
      } else {
        return of("UNEXPECTED_ERROR");
      }
      
    })); 
  }


}

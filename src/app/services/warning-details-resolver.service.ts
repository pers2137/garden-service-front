import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { WarningsServiceService } from './warnings-service.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarningDetailsResolverService implements Resolve<any> {

  constructor(private warningService: WarningsServiceService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    var id = route.paramMap.get('id');
    var warningId = route.paramMap.get('warningId');
    return this.warningService.getWarningDetail(Number(id), Number(warningId)).pipe(catchError((error) => {
      console.log(error);
      this.router.navigate(['404']);
      return "error";
      
    })); 
  }


}

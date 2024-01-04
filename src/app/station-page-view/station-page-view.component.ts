import { Component, OnInit } from '@angular/core';
import { StationService } from '../services/station-service.service';
import { Subscription } from 'rxjs';
import { Station } from '../models/station.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-view',
  templateUrl: './station-page-view.component.html',
  styleUrls: ['./station-page-view.component.scss']
})
export class StationPageViewComponent implements OnInit {

  gridColumns = 5;
  stationList: Station[] = [];
  error: boolean = false;

  constructor(public stationService: StationService, private router: Router) {}

  ngOnInit() {

    this.stationService.getStationsList().subscribe(
        resData => {
          this.stationList = resData.stationListElement;
        },
        errorMessage => {
          this.error = true;
          console.log(errorMessage);
        }
    );

  }

  // this.router.navigate(['login']);
  toEditPage(id?: number) {
    this.router.navigate(['settings', id, 'edit']);
  }

  toInformationPage(id?: number) {
    this.router.navigate(['information', id]);
  }
}

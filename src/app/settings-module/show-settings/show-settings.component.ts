import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Station } from 'src/app/models/station.model';

@Component({
  selector: 'app-show-settings',
  templateUrl: './show-settings.component.html',
  styleUrls: ['./show-settings.component.scss']
})
export class ShowSettingsComponent implements OnInit {

  station: Station = {};
  notFound: boolean = false;
  error: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if(this.route.snapshot.data[0] === "NOT_FOUND") {
      this.notFound = true;
    } else if (this.route.snapshot.data[0] === "UNEXPECTED_ERROR") {
      this.error = true;
    } else {
      this.station = this.route.snapshot.data[0]
    }

  }

}

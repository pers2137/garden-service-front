import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { WarningResponseList } from 'src/app/services/warnings-service.service';


@Component({
  selector: 'app-warnings-list',
  templateUrl: './warnings-list.component.html',
  styleUrls: ['./warnings-list.component.scss']
})
export class WarningsListComponent implements OnInit{


  notFound: boolean = false;
  error: boolean = false;
  stationId: string = "";
  warningsList: WarningResponseList;
  stationName: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router ){}

  ngOnInit() {
    if(this.route.snapshot.data[0] === "NOT_FOUND") {
      this.notFound = true;
    } else if (this.route.snapshot.data[0] === "UNEXPECTED_ERROR") {
      this.error = true;
    } else {
      this.warningsList = this.route.snapshot.data[0];
      this.stationName = this.route.snapshot.data[1].stationName;
    }
    console.log(this.warningsList);
    this.stationId = this.route.snapshot.paramMap.get('id')!;
  }

  navigateToNew() {
    this.router.navigate(['warnings', this.stationId, 'add']);
  }

}

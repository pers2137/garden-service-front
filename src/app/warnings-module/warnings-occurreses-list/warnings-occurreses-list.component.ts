import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { WarningsServiceService } from 'src/app/services/warnings-service.service';



@Component({
  selector: 'app-warnings-occurreses-list',
  templateUrl: './warnings-occurreses-list.component.html',
  styleUrls: ['./warnings-occurreses-list.component.scss']
})
export class WarningsOccurresesListComponent implements OnInit {

  warningList: {
    timestamp: number;
    sensorAddressList: string[];
  }[] = [];


  notFound: boolean = false;
  error: boolean = false;
  pageCount: number = 0;
  recordCount: number = 0;
  stationName: string = "";

  constructor(private warningsServiceService: WarningsServiceService,
              private route: ActivatedRoute,
              public router: Router,) {}

  ngOnInit(): void {

    if(this.route.snapshot.data[0] === "NOT_FOUND") {
      this.notFound = true;
    } else if (this.route.snapshot.data[0] === "UNEXPECTED_ERROR") {
      this.error = true;
    } else {
       this.stationName = this.route.snapshot.data[0].normName;
    }



    var warningId = this.route.snapshot.paramMap.get('warningId');
    this.warningsServiceService.getWarningList(Number(warningId), 0).subscribe(
      result => {
          this.warningList = result.warningInformationList;
          this.recordCount = result.recordCount
      },
      error =>{}
    )

  }

  handlePageEvent(e: PageEvent) {
    var warningId = this.route.snapshot.paramMap.get('warningId');
    this.warningsServiceService.getWarningList(Number(warningId), e.pageIndex).subscribe(
      result => {
          this.warningList = result.warningInformationList;
          this.recordCount = result.recordCount
      },
      error =>{}
    )
  }

  back() {
    var stationId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['warnings', stationId]);
  }
}

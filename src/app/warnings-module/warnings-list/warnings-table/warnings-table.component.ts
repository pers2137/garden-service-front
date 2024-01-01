import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WarningResponseList, WarningsServiceService } from 'src/app/services/warnings-service.service';
import { DeleteWarningSnackBarComponent } from 'src/app/snackbar/delete-warning-snack-bar/delete-warning-snack-bar.component';





@Component({
  selector: 'app-warnings-table',
  templateUrl: './warnings-table.component.html',
  styleUrls: ['./warnings-table.component.scss']
})
export class WarningsTableComponent implements OnInit{

  @Input() warningsList: WarningResponseList;

  constructor(private warningService: WarningsServiceService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    // console.log(this.warningsList);
  }

  deleteWarning(warningId: number) {

    this.warningService.deleteWarning(warningId).subscribe(() => {
      this._snackBar.openFromComponent(DeleteWarningSnackBarComponent, {
        duration: 2500,
      });

      var indexToRemove = this.warningsList.warningResponseList.findIndex(it => it.warningId == warningId);
      this.warningsList.warningResponseList.splice(indexToRemove, 1);
    }, 
    error => { console.log(error);}
    );
  }

  editWarning(warningId: number) {
    var stationId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['warnings', stationId, 'edit', warningId]);
  }

  showAllWarnings(warningId: number) {
    var stationId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['warnings', stationId, 'list', warningId]);
  }

}

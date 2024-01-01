import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorList } from 'src/app/services/station-service.service';
import { WarningDetailResponse, WarningsServiceService } from 'src/app/services/warnings-service.service';
import { AddWarningSnackBarComponent } from 'src/app/snackbar/add-warning-snack-bar/add-warning-snack-bar.component';
import { DeleteWarningSnackBarComponent } from 'src/app/snackbar/delete-warning-snack-bar/delete-warning-snack-bar.component';
import { EditWarningSnackBarComponent } from 'src/app/snackbar/edit-warning-snack-bar/edit-warning-snack-bar.component';

@Component({
  selector: 'app-warnings-details-edit',
  templateUrl: './warnings-details-edit.component.html',
  styleUrls: ['./warnings-details-edit.component.scss']
})
export class WarningsDetailsEditComponent implements OnInit {

  errors: string[] = [];
  notFound: boolean = false;
  error: boolean = false;
  stationId: any = "";
  warningDetail: WarningDetailResponse;
  selectedType: String;
  sensorList: SensorList;

  sensorTypeList: string[] = ["Nasłonecznienie",
  "Wilgotność gleby",
  "Temperatura powietrza",
  "Wilgotność"
  ];
  sensorToChoose: string[] = [];
  belowTresholdText: string[] = ["Nad wyznaczonym progiem","Pod wyznaczonym progiem"]
  modeList: string[] = ["Minimum","Maksimum","Średnia"];
  selectedTresholdText: string = "";
  selectedMode = "";
  sensorToAdd: string = "";


  constructor(private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private warningService: WarningsServiceService){}

  ngOnInit() {
    this.stationId = this.route.snapshot.paramMap.get('id');
    if(this.route.snapshot.data[0] === "NOT_FOUND" || this.route.snapshot.data[1] === "NOT_FOUND") {
      this.notFound = true;
    } else if (this.route.snapshot.data[0] === "UNEXPECTED_ERROR" || this.route.snapshot.data[1] === "NOT_FOUND") {
      this.error = true;
    } else {
      this.warningDetail = this.route.snapshot.data[0];
      this.sensorList =  this.route.snapshot.data[1];
    }
    // console.log(this.route.snapshot.data[1]);
    if(this.warningDetail.measurementType === "INSOLATION") this.selectedType = this.sensorTypeList[0];
    else if(this.warningDetail.measurementType === "SOIL_HUMIDITY") this.selectedType = this.sensorTypeList[1];
    else if(this.warningDetail.measurementType === "AIR_TEMP") this.selectedType = this.sensorTypeList[2];
    else this.selectedType = this.sensorTypeList[3];
    
    if(this.warningDetail.belowThreshold) this.selectedTresholdText = this.belowTresholdText[1];
    else this.selectedTresholdText = this.belowTresholdText[0];

    if(this.warningDetail.criterion === "MIN") this.selectedMode = this.modeList[0];
    else if(this.warningDetail.criterion === "MAX") this.selectedMode = this.modeList[1];
    else this.selectedMode = this.modeList[2];

    if(this.selectedType === this.sensorTypeList[0]) { this.sensorToChoose = this.sensorList.sList; }
    else if((this.selectedType == this.sensorTypeList[1])) {this.sensorToChoose = this.sensorList.shList; }
    else if((this.selectedType == this.sensorTypeList[2])) {this.sensorToChoose = this.sensorList.dsList.concat(this.sensorList.dhtList); }
    else if((this.selectedType == this.sensorTypeList[3])) {this.sensorToChoose = this.sensorList.dhtList;}


    this.sensorToChoose = this.sensorToChoose.filter( it => !this.warningDetail.sensorAddress.includes(it) );

  }


  back() {
    this.router.navigate(['warnings', this.stationId]);
  }

  deleteSensor(addres: string) {
    this.warningDetail.sensorAddress.splice(this.warningDetail.sensorAddress.indexOf(addres), 1);
    this.sensorToChoose.push(addres);
  }

  addNewSensorToWarnings() {
    if(this.sensorToAdd === "") return;
    this.warningDetail.sensorAddress.push(this.sensorToAdd);
    

    this.sensorToChoose.splice(this.sensorToChoose.indexOf(this.sensorToAdd), 1);
    this.sensorToAdd = ""
  }

  save() {

    this.errors = [];
    if(this.warningDetail.normName === "") {
      this.errors.push("Podaj nazwe normy!");
    }

    if(this.warningDetail.measurementType === "") {
      this.errors.push("Wybierz typ pomiaru!");
    }

    if(this.warningDetail.sensorAddress.length === 0) {
      this.errors.push("Musisz dodać co najmniej jeden sensor");
    }

    if(this.selectedMode === "") {
      this.errors.push("Wybierz regułę!");
    }

    if(this.errors.length !== 0) {
      return;
    }


    var warningId = this.route.snapshot.paramMap.get('warningId');
    
    var criterion;
    if(this.selectedMode == this.modeList[0]) criterion = "MIN";
    else if(this.selectedMode == this.modeList[1]) criterion = "MAX";
    else criterion = "AVG";

    var belowTreshold;
    if(this.selectedTresholdText == this.belowTresholdText[0]) belowTreshold = false;
    else belowTreshold = true;

      this.warningService.editWarning(this.stationId, 
                                      Number(warningId),
                                      this.warningDetail.normName,
                                      this.warningDetail.measurementType, //todo tutaj konwersja na S SH DS DSH
                                      criterion,
                                      this.warningDetail.threshold,
                                      belowTreshold,
                                      this.warningDetail.sensorAddress)
                        .subscribe(
                        () => {
                              this._snackBar.openFromComponent(EditWarningSnackBarComponent, {
                              duration: 2500,
                              });
                              this.errors = [];
                              // this.router.navigate(['warnings', this.stationId]);

                        }, 
                        error => {
                            console.log(error);
                        }
                        );


  }

  delete() {
    var warningId = this.route.snapshot.paramMap.get('warningId');
    this.warningService.deleteWarning(Number(warningId)).subscribe(() => {
      this._snackBar.openFromComponent(DeleteWarningSnackBarComponent, {
        duration: 2500,
      });
      this.router.navigate(['warnings', this.stationId]);
      
    }, 
    error => { console.log(error);}
    );
  }
}

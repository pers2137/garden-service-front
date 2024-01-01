import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';
import { SensorList } from 'src/app/services/station-service.service';
import { WarningsServiceService } from 'src/app/services/warnings-service.service';
import { AddWarningSnackBarComponent } from 'src/app/snackbar/add-warning-snack-bar/add-warning-snack-bar.component';




@Component({
  selector: 'app-warnings-details',
  templateUrl: './warnings-details.component.html',
  styleUrls: ['./warnings-details.component.scss']
})
export class WarningsDetailsComponent implements OnInit {

  errors: string[] = [];
  //INPUTS DATA
  selectedMode = "";
  selectedSensorType = "";
  threshold = 0;
  checked: boolean = false;
  sensorToAdd: string = "";

  sensorChooseButtonDisabled = false;

  notFound: boolean = false;
  error: boolean = false;
  stationId: any = "";
  modeList: string[] = ["Minimum","Maksimum","Średnia"];
  sensorTypeList: string[] = ["Nasłonecznienie",
                              "Wilgotność gleby",
                              "Temperatura powietrza",
                              "Wilgotność"
                            ];


  selectedType = "";
  averageList: string[] = ["Nad wyznaczonym progiem","Pod wyznaczonym progiem"]
  average = this.averageList[1];


  normName = "";
  sensorList: SensorList;
  sensorToChoose: string[] = [];
  choosedSensorAddress: string[] = [];
  stationName: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private warningService: WarningsServiceService){}

  ngOnInit() {
    this.stationId = this.route.snapshot.paramMap.get('id');
    if(this.route.snapshot.data[0] === "NOT_FOUND") {
      this.notFound = true;
    } else if (this.route.snapshot.data[0] === "UNEXPECTED_ERROR") {
      this.error = true;
    } else {
      this.sensorList = this.route.snapshot.data[0];
      this.stationName = this.route.snapshot.data[1].stationName;
    }

  }


  back() {
    this.router.navigate(['warnings', this.stationId]);
  }

  sensorInputChange() {
  
    if(this.selectedSensorType === this.sensorTypeList[0]) { this.sensorToChoose = this.sensorList.sList; }
    else if((this.selectedSensorType == this.sensorTypeList[1])) {this.sensorToChoose = this.sensorList.shList; }
    else if((this.selectedSensorType == this.sensorTypeList[2])) {this.sensorToChoose = this.sensorList.dsList.concat(this.sensorList.dhtList); }
    else if((this.selectedSensorType == this.sensorTypeList[3])) {this.sensorToChoose = this.sensorList.dhtList;}
    
    this.choosedSensorAddress = [];
    // if(this.sensorToChoose.length === 0)  {this.sensorChooseButtonDisabled = true; }
    // else  { this.sensorChooseButtonDisabled = false; }

  }


  saveWarning() {
    this.errors = [];
    if(this.normName === "") {
      this.errors.push("Podaj nazwe normy!");
    }

    if(this.selectedSensorType === "") {
      this.errors.push("Wybierz typ pomiaru!");
    }

    if(this.selectedMode === "") {
      this.errors.push("Wybierz regułę!");
    }

    if(this.choosedSensorAddress.length === 0) {
      this.errors.push("Musisz dodać co najmniej jeden sensor");
    }

    if(this.errors.length !== 0) {
      return;
    }
    //walidacja

    var measurementsType;
    if(this.selectedSensorType == this.sensorTypeList[0]) measurementsType = "INSOLATION";
    else if(this.selectedSensorType == this.sensorTypeList[1]) measurementsType = "SOIL_HUMIDITY";
    else if(this.selectedSensorType == this.sensorTypeList[2]) measurementsType = "AIR_TEMP";
    else measurementsType = "AIR_HUMIDITY";

    var criterion;
    if(this.selectedMode == this.modeList[0]) criterion = "MIN";
    else if(this.selectedMode == this.modeList[1]) criterion = "MAX";
    else criterion = "AVG";

    var belowTreshold;
    if(this.average == this.averageList[0]) belowTreshold = false;
    else belowTreshold = true;

    this.warningService.saveNewWarning(this.stationId, 
                                       this.normName,
                                       measurementsType, //todo tutaj konwersja na S SH DS DSH
                                       criterion,
                                       this.threshold,
                                       belowTreshold,
                                       this.choosedSensorAddress).subscribe(
      () => {
        this._snackBar.openFromComponent(AddWarningSnackBarComponent, {
          duration: 2500,
        });
        this.errors = [];
        this.router.navigate(['warnings', this.stationId]);

      }, 
      error => {
            console.log(error);
          }
      );
  }

  addNewSensorToWarnings() {
    if(this.sensorToAdd === "") return;
    this.choosedSensorAddress.push(this.sensorToAdd);
    

    this.sensorToChoose.splice(this.sensorToChoose.indexOf(this.sensorToAdd), 1);
    this.sensorToAdd = ""
  }

  deleteSensor(addres: string) {
    this.choosedSensorAddress.splice(this.sensorToChoose.indexOf(addres), 1);
    this.sensorToChoose.push(addres);
  }

}

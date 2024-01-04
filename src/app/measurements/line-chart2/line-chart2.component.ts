import { Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CanvasJS, CanvasJSChart } from "@canvasjs/angular-charts";
import { BaseChartDirective } from 'ng2-charts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";
import { Subscription, timestamp } from "rxjs";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  labels: number[];
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-line-chart2',
  templateUrl: './line-chart2.component.html',
  styleUrls: ['./line-chart2.component.scss']
})
export class LineChart2Component implements OnInit, OnDestroy {

  @Input() dataList: {
    sensorData: [{
      sensorId: string;
      measurementsForSensorList: [{
        value: number;
        timestamp: number;
      }]
    }];
    measurementType: string;
  }
  
  @ViewChild("char2", {static: false}) chart: ChartComponent  | any;
  public chartOptions: any;


  constructor() {}


  @Input() eventEmitter: EventEmitter<[]>; 
  private subscription: Subscription; 

  @Input() eventEmitterUpdateData: EventEmitter<[]>; 
  private subscriptionUpdateData: Subscription; 

  @ViewChild(BaseChartDirective) charttt: BaseChartDirective;


  ngOnDestroy(): void { 
    this.subscription.unsubscribe(); 
    this.subscriptionUpdateData.unsubscribe(); 
  } 

  ngOnInit() {

    var object: any = [];
    this.subscribeToParentEmitter();
    this.subscribeToParentEmitterUpdateData();

    this.dataList.sensorData.forEach(el => {

      object.push({
        type: "line",
        lineDashType: "dash",
        showInLegend: true,
        name: "Sensor " + el.sensorId,
        xValueType: "dateTime",
        xValueFormatString: "DD-MMM-YYYY, HH:mm",
        dataPoints: el.measurementsForSensorList ? this.getDataPoint(el.measurementsForSensorList) : []
      })

    })
    // console.log(this.charName + "xxx");
    this.chartOptions = this.charDefaultObject(object, this.dataList.measurementType)
    this.chartOptions.render();
  }

    private getDataPoint(measurementsForSensorList: [{value: number;timestamp: number;}]) {
      var dataTab: any = []
      measurementsForSensorList.forEach(el => {
          dataTab.push({
              x: el.timestamp,
              y: el.value
          })
      })
      return dataTab;
    }

    subscribeToParentEmitter(): void { 
      // console.log("cos przyszlo");
      this.subscription = this.eventEmitter.subscribe((data: []) => { 
          
          var object: any = [];
          var counter = 0;
          this.dataList.sensorData.forEach(el => {
            if(data[counter] === true) {
                object.push({
                  type: "line",
                  lineDashType: "dash",
                  showInLegend: true,
                  name: "Sensor " + el.sensorId,
                  xValueType: "dateTime",
                  xValueFormatString: "DD-MMM-YYYY, HH:mm",
                  dataPoints: el.measurementsForSensorList ? this.getDataPoint(el.measurementsForSensorList) : []
                })
            }
            counter++;
      
          })
          this.chartOptions = this.charDefaultObject(object, this.dataList.measurementType)
          this.chartOptions.render();
          
      }); 

    }  


    subscribeToParentEmitterUpdateData(): void { 
      this.subscriptionUpdateData = this.eventEmitterUpdateData.subscribe((data: any) => { 
        this.dataList.sensorData = data.sensorData;
        this.dataList.measurementType = data.measurementType;
      })
    }



    charDefaultObject(dataTable: any, measurementsType: string) {

          // console.log("mes_type" + measurementsType)
          var xText;
          if(measurementsType === undefined) xText = "Brak danych";
          else if (measurementsType === "AIR_TEMP") xText = "Temperatura powietrza";
          else if (measurementsType === "INSOLATION") xText = "Nasłonecznienie";
          else if (measurementsType === "SOIL_HUMIDITY") xText = "Wilgotność gleby";
          else xText = "Wilgotność powietrza";

          var yText;
          if(measurementsType === undefined) yText = "Brak danych";
          else if (measurementsType === "AIR_TEMP") yText = "Temperatura powietrza [C]";
          else if (measurementsType === "INSOLATION") yText = "Nasłonecznienie [%]";
          else if (measurementsType === "SOIL_HUMIDITY") yText = "Wilgotność gleby [%]";
          else yText = "Wilgotność powietrza [%]";


          return new CanvasJS.Chart("char2", {
            animationEnabled: true,
            zoomEnabled: true,
          //zoomType: "xy",
            exportEnabled: true,
            interactivityEnabled: true,
      
            theme: "light2",
            title:{
            text: xText
            },
            axisX:{
              valueFormatString: "DD.MM - HH:mm"
            },
            axisY: {
              title: yText
            },
            toolTip: {
              shared: true
            },
            legend: {
            cursor: "pointer",
            itemclick: function (e: any) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              } else {
                e.dataSeries.visible = true;
              } 
              e.chart.update();
            }
            },
            data: dataTable
          });
    }



}
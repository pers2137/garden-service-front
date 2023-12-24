import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { FormsModule } from '@angular/forms';

import { MatCardModule, MAT_CARD_CONFIG } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { UserGuard } from './guard/application-guard';
import { TestComponent } from './test/test.component';
import { MenuComponent } from './menu/menu.component';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StationPageViewComponent } from './station-page-view/station-page-view.component';
import { ShowSettingsComponent } from './settings-module/show-settings/show-settings.component';
import { EditSettingsComponent } from './settings-module/edit-settings/edit-settings.component';
import { SettingsModuleComponent } from './settings-module/settings-module.component';
import { InformationModuleComponent } from './information-module/information-module.component';
import { StationSerchListComponent } from './station-serch-list/station-serch-list.component';
import { 
	IgxAvatarModule,
	IgxFilterModule,
	IgxIconModule,
	IgxListModule,
	IgxInputGroupModule,
	IgxButtonGroupModule,
	IgxRippleModule
 } from "igniteui-angular";
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ElectrovalveListComponent } from './electrovalve-list/electrovalve-list.component';
import { MatTreeModule } from '@angular/material/tree';
import { AddNewSzcheduleComponent } from './electrovalve-list/add-new-szchedule/add-new-szchedule.component';
import { InformationStationComponent } from './information-module/information-station/information-station.component';
import {MatTableModule} from '@angular/material/table';
import { ValvesTableComponent } from './information-module/valves-table/valves-table.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { LineChartComponent } from './measurements/line-chart/line-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AnalogSensorTableComponent } from './information-module/analog-sensor-table/analog-sensor-table.component';
import { DigitalSensorTableComponent } from './information-module/digital-sensor-table/digital-sensor-table.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
//import { SaveSnackBarComponent } from './settings-module/edit-settings/save-snack-bar/save-snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SaveSettingSnackbarComponent } from './account-setting/save-setting-snackbar/save-setting-snackbar.component';
import { StatusDotComponent } from './common/status-dot/status-dot.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    LoginComponent,
    AlertComponent,
    TestComponent,
    MenuComponent,
    StationPageViewComponent,
    ShowSettingsComponent,
    EditSettingsComponent,
    SettingsModuleComponent,
    InformationModuleComponent,
    StationSerchListComponent,
    AccountSettingComponent,
    NotFoundComponent,
    ElectrovalveListComponent,
    AddNewSzcheduleComponent,
    InformationStationComponent,
    ValvesTableComponent,
    MeasurementsComponent,
    DigitalSensorTableComponent,
    LineChartComponent,
    AnalogSensorTableComponent,
    SaveSettingSnackbarComponent,
    StatusDotComponent,
    //SaveSnackBarComponent
    
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    IgxAvatarModule,
    IgxFilterModule,
    IgxIconModule,
    IgxListModule,
    IgxInputGroupModule,
    IgxButtonGroupModule,
    IgxRippleModule,
    MatSliderModule,
    MatTreeModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CanvasJSAngularChartsModule,
    MatSnackBarModule
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}, UserGuard, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

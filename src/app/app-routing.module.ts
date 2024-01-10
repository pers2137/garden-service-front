import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserGuard } from './guard/application-guard';
import { StationPageViewComponent } from './station-page-view/station-page-view.component';
import { SettingsResolverService } from './services/settings-resolver.service';
import { EditSettingsComponent } from './settings-module/edit-settings/edit-settings.component';
import { InformationModuleComponent } from './information-module/information-module.component';
import { SettingsModuleComponent } from './settings-module/settings-module.component';
import { StationSerchListComponent } from './station-serch-list/station-serch-list.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InformationStationComponent } from './information-module/information-station/information-station.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { StationInformationResolverService } from './services/station-information-resolver.service';
import { LoggedGuard } from './guard/logged-guard';
import { WarningsModuleComponent } from './warnings-module/warnings-module.component';
import { WarningsListComponent } from './warnings-module/warnings-list/warnings-list.component';
import { WarningsDetailsComponent } from './warnings-module/warnings-details/warnings-details.component';
import { SensorResolverService } from './services/sensor-resolver.service';
import { WarningsResolverService } from './services/warnings-resolver.service';
import { WarningsDetailsEditComponent } from './warnings-module/warnings-details/warnings-details-edit/warnings-details-edit.component';
import { WarningsOccurresesListComponent } from './warnings-module/warnings-occurreses-list/warnings-occurreses-list.component';
import { WarningDetailsResolverService } from './services/warning-details-resolver.service';
import { StationInformationBasicResolverService } from './services/station-information-basic-resolver.service';

const routes: Routes = [ 
  { path: '', redirectTo: 'station-view', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'station-view',
    component: StationPageViewComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'information',
    component: InformationModuleComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', component: StationSerchListComponent },
      {
        path: ':id',
        component: InformationStationComponent,
        resolve: [StationInformationResolverService]
      },
    ]
  },
  {
    path: 'settings',
    component: SettingsModuleComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', component: StationSerchListComponent },
      {
        path: ':id/edit',
        component: EditSettingsComponent,
        resolve: [SettingsResolverService]
      },

    ]
  },
  {
    path: 'warnings',
    component: WarningsModuleComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', component: StationSerchListComponent },
      {
        path: ':id',
        component: WarningsListComponent,
        resolve: [WarningsResolverService, StationInformationBasicResolverService]
      },
      {
        path: ':id/add',
        component: WarningsDetailsComponent,
        resolve: [SensorResolverService, StationInformationBasicResolverService]
      },
      {
        path: ':id/edit/:warningId',
        component: WarningsDetailsEditComponent,
        resolve: [WarningDetailsResolverService, SensorResolverService]
      },
      {
        path: ':id/list/:warningId',
        component: WarningsOccurresesListComponent,
        resolve: [WarningDetailsResolverService]
      },

    ]
  },
  {
    path: 'measurements',
    component: MeasurementsComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'account',
    component: AccountSettingComponent,
    canActivate: [UserGuard],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

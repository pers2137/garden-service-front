import { Component, HostBinding, OnInit } from '@angular/core';
import { IgxFilterOptions } from 'igniteui-angular';
import { StationService } from '../services/station-service.service';
import { Station } from '../models/station.model';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-station-serch-list',
  templateUrl: './station-serch-list.component.html',
  styleUrls: ['./station-serch-list.component.scss']
})
export class StationSerchListComponent implements OnInit {

  public searchContact: string = ""
  public isLast: boolean = true;
  public error: boolean = false;

    public size = 'large';
    public sizes = [
      { label: 'large', selected: this.size === 'large', togglable: true },
      // { label: 'medium', selected: this.size === 'medium', togglable: true },
      // { label: 'small', selected: this.size === 'small', togglable: true }
    ];
    
    stationList: Station[] = [];
    public listType = "INFO";

  constructor(private stationService: StationService,
              private router: Router) {}

    public ngOnInit() {
      if(this.router.url === "/information") {
        this.listType = "INFO"
      } else if(this.router.url === "/settings") {
        this.listType = "SETTINGS"
      }

      console.log(this.router.url);
      
      this.stationService.getStationsList().subscribe(
        resData => {
          console.log(resData);
          this.stationList = resData.stationListElement;
          console.log(this.stationList);
          this.error = false;
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = true;
        }
    );
    }

    @HostBinding('style.--ig-size')
    protected get sizeStyle() {
        return `var(--ig-size-${this.size})`;
    }

    public selectSize(event: any) {
        this.size = this.sizes[event.index].label;
    }

    public toggleFavorite(contact: any, event: Event) {
        event.stopPropagation();
        contact.isFavorite = !contact.isFavorite;
    }

    get filterContacts() {
        const fo = new IgxFilterOptions();
        fo.key = 'name';
        fo.inputValue = this.searchContact;
        return fo;
    }

    public mousedown(event: Event) {
        event.stopPropagation();
    }

    public selectStation(stationId: number) {
      if(this.listType == "SETTINGS") {
        this.router.navigate(['settings',stationId,'edit']);
      } else {
        this.router.navigate(['information',stationId]);
      }
    
    }

}

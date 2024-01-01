import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(
    public router: Router
  ) { }

  menuProperties = [
    {
      id: 'main_page',
      icon: 'home',
      title: 'Przegląd stacji',
      url: 'station-view',
      numberOfelements: 0,
    },
    {
      id: 'My_Day',
      icon: 'flare',
      title: 'Informacje o stacji',
      url: 'information',
      numberOfelements: 0,
    },
    {
      id: 'categories',
      icon: 'category',
      title: 'Dane pomiarowe',
      url: 'measurements',
      numberOfelements: 0,
    },
    {
      id: 'warnings',
      icon: 'warnings',
      title: 'Normy ostrzeżeń',
      url: 'warnings',
      numberOfelements: 0,
    },
    {
      id: 'My_Day',
      icon: 'settings',
      title: 'Ustawienia stacji',
      url: 'settings',
      numberOfelements: 0,
    },
    {
      id: 'profile',
      icon: 'account_circle',
      title: 'Ustawienia konta',
      url: 'account',
      numberOfelements: 0,
    },
    // {
    //   id: 'profile',
    //   icon: 'account_circle',
    //   title: 'Pan wróbel',
    //   url: '404',
    //   numberOfelements: 0,
    // },
  ];

  navigate(url: string) {
    this.router.navigate([url]);
  }

}

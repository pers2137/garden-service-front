import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-dot',
  templateUrl: './status-dot.component.html',
  styleUrls: ['./status-dot.component.scss']
})
export class StatusDotComponent implements OnInit{

  @Input() dotType = '';

  onActiveColor = "#6fd34b"
  offActiveColor = "#e93c3c"
  autoActiveColor = "#e8de2d"

  onInactiveColor = "#def6c9"
  offInactiveColor = "#edd7d0"
  autoInactiveColor = "#e3f39a"
  
  ngOnInit() {
    
  }

}

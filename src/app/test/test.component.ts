import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  // title = 'Card View Demo';

  gridColumns = 5;

  // toggleGridColumns() {
  //   this.gridColumns = this.gridColumns === 5 ? 5 : 5;
  // }
}

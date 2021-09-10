import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'microfi-content',
  template: `<router-outlet></router-outlet>`
})
export class ContentComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

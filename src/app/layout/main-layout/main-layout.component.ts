import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  periodOfDay: string = ""

  constructor() { }

  ngOnInit() {
    var hr = (new Date()).getHours();

    if (hr >= 0 && hr < 12){
      this.periodOfDay = "Morning"
    } else if (hr >= 12 && hr < 6){
      this.periodOfDay = "Afternoon"
    } else {
      this.periodOfDay = "Evening"
    }

  }

}

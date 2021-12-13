import { AppRoutes } from './../../core/constants/app.constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  routes = AppRoutes;
  mobileNav: boolean = false;
  

  constructor() { }

  ngOnInit() {
  }

  toggleMobileNav(){
    this.mobileNav = !this.mobileNav;
  }

}

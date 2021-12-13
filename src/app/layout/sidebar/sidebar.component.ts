import { AppRoutes } from './../../core/constants/app.constants';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  routes = AppRoutes
  mobileNav: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.messageSource.subscribe((message) => {
      if(message === 'false'){
        this.mobileNav = false
      } else {
        this.mobileNav = true
      }
  });
  }

  toggleSidebar(){
    this.mobileNav = !this.mobileNav
  }

}

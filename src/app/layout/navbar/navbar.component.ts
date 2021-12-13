import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  sideNav: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }


  toggleSideNav(){
    this.sideNav = !this.sideNav;
    this.sharedService.messageSource.next(String(this.sideNav));
  }

}

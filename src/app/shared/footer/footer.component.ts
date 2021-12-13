import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() count!: number
  @Input() page: number = 1;
  @Input() itemsPerPage: number = 10;
  @Output() pageSelected: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  goBack(): void {
    this.page = this.page - 1;
    this.backDisabled;
    this.pageSelected.emit(this.page)
  }

  goForward(): void {
    this.page = this.page + 1;
    this.pageSelected.emit(this.page);
    this.forwardEnabled;
  }

  get backDisabled(): boolean {
    return true ? this.page === 1 : false;
  }

  get forwardEnabled(): boolean {
    return true ? this.count > this.page * this.itemsPerPage : false;
  }

  getPageNoCount(): number {
    if (this.itemsPerPage + ((this.page - 1) * this.itemsPerPage) < this.count){
      return this.itemsPerPage + ((this.page - 1) * this.itemsPerPage)
    } else {
      return this.count
    }
  }

}

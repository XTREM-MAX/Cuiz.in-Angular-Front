import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string = "";

  @Input()
  searchBox: boolean = false;

  displaySearchBar: boolean = false;

  constructor(public client: ClientService) { }

  ngOnInit(): void {
    this.client.search = "";
  }

  openSearchBar() {
    this.client.search = "";
    this.displaySearchBar=!this.displaySearchBar;
  }

}

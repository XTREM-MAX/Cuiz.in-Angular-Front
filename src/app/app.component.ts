import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cuiz.in';
  constructor(public router: Router) {
    document.addEventListener('contextmenu',  e => e.preventDefault()); //Avoid right clicking & long press
  }
}

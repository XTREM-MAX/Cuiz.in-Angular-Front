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
    window.addEventListener("resize", (e) => {
      if (window.outerWidth > 600)
        window.resizeTo(600, window.outerHeight);//When the app is being installed on a computer, the window can't be wider than 600px.
    });
  }
}

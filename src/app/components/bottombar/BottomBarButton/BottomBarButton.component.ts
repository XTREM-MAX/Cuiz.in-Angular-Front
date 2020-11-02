import { BottomBarButton } from './../../../models/bottombar/BottomBarButton';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-BottomBarButton',
  templateUrl: './BottomBarButton.component.html',
  styleUrls: ['./BottomBarButton.component.scss']
})
export class BottomBarButtonComponent {
  @Input() button: BottomBarButton;

  constructor(private router: Router) { }

  /**
   * When the user clicks the button, we navigate him to the chosen page
   */
  onClick() {
    this.router.navigateByUrl(this.button.route);
  }
}

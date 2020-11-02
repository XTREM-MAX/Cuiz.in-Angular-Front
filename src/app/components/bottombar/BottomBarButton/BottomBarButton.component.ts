import { BottomBarButton } from './../../../models/bottombar/BottomBarButton';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-BottomBarButton',
  templateUrl: './BottomBarButton.component.html',
  styleUrls: ['./BottomBarButton.component.scss']
})
export class BottomBarButtonComponent implements OnInit {
  @Input() button: BottomBarButton;

  constructor() { }

  ngOnInit() { }
  
}

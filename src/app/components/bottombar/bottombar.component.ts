import { BottomBarView } from './../../models/bottombar/BottomBarView';
import { BottomBarButton } from '../../models/bottombar/BottomBarButton';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.scss']
})
export class BottombarComponent implements OnInit {

  buttons: { [key: number]: BottomBarButton } = {
    0/* BottomBarView.HOME */:       new BottomBarButton("Découverte", "heart", true),//Par défaut, la page Home est focus.
    1/* BottomBarView.RECIPES */:    new BottomBarButton("Recettes", "recipe"),
    2/* BottomBarView.MY_ACCOUNT */: new BottomBarButton("Mon Compte", "account")
  };

  constructor() {}

  ngOnInit() {}

}

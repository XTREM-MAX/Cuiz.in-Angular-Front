import { BottomBarView } from './../../models/bottombar/BottomBarView';
import { BottomBarButton } from '../../models/bottombar/BottomBarButton';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-bottombar',
	templateUrl: './bottombar.component.html',
	styleUrls: ['./bottombar.component.scss']
})
export class BottombarComponent {

	buttons: { [key: number]: BottomBarButton } = {
		0/* BottomBarView.HOME */: new BottomBarButton("Découverte", "heart", "home", true),//Par défaut, la page Home est focus.
		1/* BottomBarView.RECIPES */: new BottomBarButton("Recettes", "recipe", "recipes"),
		2/* BottomBarView.MY_ACCOUNT */: new BottomBarButton("Mon Compte", "account", "account")
	};

	constructor(private router: Router) {
		router.events.subscribe(val => {
			for (let button of Object.values(this.buttons))
				button.updateRoute(router.url.substr(1));
		});
	}

}

import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent {

	get name() {
		return this._client.user?.name;
	}
	get mail() {
		return this._client.user?.email;
	}
	
	constructor(
		private _client: ClientService
	) { }

}

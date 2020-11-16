import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

	name: string;
	mail: string;
	
	constructor(
		private _client: ClientService
	) { }

	ngOnInit() {
		this.name = this._client.user?.name ?? "[Nom]";
		this.mail = this._client.user?.email ?? "[Email]";
	}

}

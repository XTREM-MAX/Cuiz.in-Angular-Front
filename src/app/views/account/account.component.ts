import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { PasswordFieldComponent } from './password-field/password-field.component';

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
		private _client: ClientService,
		public dialog: MatDialog,
		private _snackbar: MatSnackBar,
		private _router: Router,
	) { }

	public changePassword() {
		this.dialog.open(PasswordFieldComponent, {
			data: {
				success: async (text: string) => {
					//Create account
					let response = await this._client.update("password", text);
					if(response)
						this._snackbar.open(response === "success" ? `Mot de passe mis à jour` : `Erreur lors de la mise à jour du mot de passe`, "", {
							duration: 2000,
						});
				}
			}
		});
	}

	public disconnect() {
		this._client.logout();
	}

}

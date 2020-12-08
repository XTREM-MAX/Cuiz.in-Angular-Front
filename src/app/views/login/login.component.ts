import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { LoginAskNameComponent } from './login-ask-name/login-ask-name.component';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(
		private _snackBar: MatSnackBar,
		private _client: ClientService,
		private _router: Router,
		public dialog: MatDialog,
	) { }

	password: string;
	email: string;
	loading: boolean;

	@ViewChild("emailInput") emailInput: ElementRef;

	ngOnInit() {
	}

	async onSubmit() {
		this.loading = true;
		let login = await this._client.login(this.email, this.password);
		switch (login) {
			case "bad_password":
				this.dispBadPassword();
				this.loading = false;
				this.emailInput.nativeElement.focus();
				break;
			case "unknown_email":
				//Register
				this.loading = false;
				this.emailInput.nativeElement.focus();
				this.dialog.open(LoginAskNameComponent, {
					data: {
						success: async (text: string) => {
							this.loading = true;
							//Create account
							await this._client.register(this.email, this.password, text);
							this._snackBar.open(`Bienvenue, ${this._client.user.name} !`, "", { duration: 2000 });
							this._router.navigateByUrl("/home");
						}
					}
				});
				break;
			case "logged":
				this._client.init();
				this._snackBar.open(`Vous revoilà, ${this._client.user.name} !`, "", { duration: 2000 });
				this._router.navigateByUrl("/home");
				break;
		}
	}

	dispBadPassword() {
		this._snackBar.open("Le mot de passe spécifié est incorrecte", "", { duration: 5000 });
	}

}

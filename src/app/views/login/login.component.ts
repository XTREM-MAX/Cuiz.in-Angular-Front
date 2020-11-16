import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(
		private _snackBar: MatSnackBar
	) { }
	
	password: string;
	email: string;

  ngOnInit() {
	}

	onSubmit() {
		console.log(this.password, this.email);
	}

	dispBadPassword() {
		this._snackBar.open("Le mot de passe spécifié est incorrecte", "", { duration: 5000 });
	}

}

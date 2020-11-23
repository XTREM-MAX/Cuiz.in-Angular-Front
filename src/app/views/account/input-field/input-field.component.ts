import { Component, Input } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})

export class InputFieldComponent {

	@Input() inputType: string;
	@Input() label: string;
	@Input() value: string;
	@Input() type: string;

	lastValue: string;

	private readonly _updateTime: number = 1000;
	private _timeoutId: number;

  constructor(
		private _snackbar: MatSnackBar,
		public client: ClientService
	) { }

	public onChange() {
		if (this._timeoutId)
			window.clearTimeout(this._timeoutId)
		this._timeoutId = window.setTimeout(() => this._sendChanges(), this._updateTime);
	}

	private async _sendChanges() {
		if (this.value == this.client.user[this.type])//Not changed
			return;
		
		let response = await this.client.update(this.type, this.value);
		if(response)
			this._snackbar.open(response === "success" ? `${this.label} mis à jour : ${this.value}` : `Erreur lors de la mise à jour de ${this.label}`, "", {
				duration: 2000,
			});
	}

}

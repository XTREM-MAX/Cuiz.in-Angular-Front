import { Component, Input, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})

export class InputFieldComponent implements OnInit {

	@Input() inputType: string;
	@Input() label: string;

	private readonly _updateTime: number = 1000;
	private _timeoutId: number;
	private _value: string;

  constructor(
		private _snackbar: MatSnackBar
	) { }

	public onChange(event) {
		this._value = event.target.value;

		if (this._timeoutId)
			window.clearTimeout(this._timeoutId)
		this._timeoutId = window.setTimeout(() => this._sendChanges(), this._updateTime);
	}

	private _sendChanges() {
		this._snackbar.open(`${this.label} mis à jour : ${this._value}`, "", {
			duration: 2000,
		});
	}

  ngOnInit() {
  }

}
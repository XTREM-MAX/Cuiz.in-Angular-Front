import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private readonly _updates: SwUpdate,
    private readonly _snackBar: MatSnackBar
  ) {
    this._updates.available.subscribe(e => this._showUpdateAlert());
  }

  private _showUpdateAlert(): void {
    this._snackBar.open('Une mise à jour est disponible', 'Mettre à jour', {
      duration: 10000000000000000000000000000000,
    }).onAction().subscribe(e => this._update());
  }

  private async _update(): Promise<void> {
    await this._updates.activateUpdate();
    document.location.reload();
  }
}

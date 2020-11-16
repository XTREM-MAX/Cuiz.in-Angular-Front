import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-ask-name',
  templateUrl: './login-ask-name.component.html',
  styleUrls: ['./login-ask-name.component.scss']
})
export class LoginAskNameComponent {

  text: string;

  constructor(public dialogRef: MatDialogRef<LoginAskNameComponent>, @Inject(MAT_DIALOG_DATA) public data: { success: (text: string) => void }) { }

  already: boolean;
  add() {
    if (!this.already && this.text?.length) {
      this.data.success(this.text);
      this.dialogRef.close();
      this.already = true;
    }
  }

}

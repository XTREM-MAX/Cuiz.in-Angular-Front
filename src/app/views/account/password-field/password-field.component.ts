import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginAskNameComponent } from '../../login/login-ask-name/login-ask-name.component';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent {


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

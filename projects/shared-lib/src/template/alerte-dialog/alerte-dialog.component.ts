import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'microfi-alerte-dialog',
  templateUrl: './alerte-dialog.component.html',
  styleUrls: ['./alerte-dialog.component.scss']
})
export class AlerteDialogComponent  {

  /**
   * @param {MatDialogRef} dialogRef Component reference to dialog.
   * @param {any} data Provides any data.
   */
   constructor(public dialogRef: MatDialogRef<AlerteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}

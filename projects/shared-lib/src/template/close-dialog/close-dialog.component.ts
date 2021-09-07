import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'microfi-close-dialog',
  templateUrl: './close-dialog.component.html',
  styleUrls: ['./close-dialog.component.scss']
})
export class CloseDialogComponent {
    /**
   * @param {MatDialogRef} dialogRef Component reference to dialog.
   * @param {any} data Provides any data.
   */
   constructor(public dialogRef: MatDialogRef<CloseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
      ) { }

ngOnInit(): void {
}

onCancel() {
  this.dialogRef.close(false);
}

onAccept() {
  this.dialogRef.close(true);
}

}

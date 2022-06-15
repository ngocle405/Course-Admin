import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(public ref: DynamicDialogRef) {}

  ngOnInit() {}

  confirm(isConfirm: boolean) {
    this.ref.close(isConfirm);
  }
}

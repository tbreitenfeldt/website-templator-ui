import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent implements OnInit {
  @Input() title?: string = 'Confirmation Dialog';
  @Input() message: string;
  @Input() btnOkText?: string = 'OK';
  @Input() btnCancelText?: string = 'Cancel';
  @ViewChild('modalRef') modalRef: ModalComponent;

  constructor() {}

  ngOnInit(): void {}

  open(): Promise<any> {
    return this.modalRef.open();
  }

  decline(): void {
    this.modalRef.close(false);
  }

  accept(): void {
    this.modalRef.close(true);
  }
}

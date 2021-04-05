import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
})
export class AlertModalComponent implements OnInit {
  @Input() title?: string = 'Confirmation Dialog';
  @Input() message: string;
  @ViewChild('modalRef') modalRef: ModalComponent;

  constructor() {}

  ngOnInit(): void {}

  open(): Promise<any> {
    return this.modalRef.open();
  }

  dismiss(): void {
    this.modalRef.close();
  }
}

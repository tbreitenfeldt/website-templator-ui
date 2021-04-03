import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorService } from 'src/app/services/error.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @ViewChild('modalElementReference') modalElementReference: any;
  modalRef: NgbModalRef;
  @Input() title: string;

  constructor(
    private modalService: NgbModal,
    private titleService: TitleService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  close(result: any = null): void {
    this.modalRef.close(result);
  }

  dismiss(): void {
    this.modalRef.dismiss();
  }

  open(): Promise<any> {
    this.titleService.setPageTitle(this.title);
    this.modalRef = this.modalService.open(this.modalElementReference);

    return this.modalRef.result.then(
      (result) => {
        //On close event
        this.titleService.setPreviousPageTitle();
        this.errorService.error = null;
        return result;
      },
      (reason) => {
        //On Dismiss event
        this.titleService.setPreviousPageTitle();
        this.errorService.error = null;
      }
    );
  }
}

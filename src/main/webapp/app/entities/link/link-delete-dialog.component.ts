import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILink } from 'app/shared/model/link.model';
import { LinkService } from './link.service';

@Component({
    selector: 'jhi-link-delete-dialog',
    templateUrl: './link-delete-dialog.component.html'
})
export class LinkDeleteDialogComponent {
    link: ILink;

    constructor(private linkService: LinkService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.linkService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'linkListModification',
                content: 'Deleted an link'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-link-delete-popup',
    template: ''
})
export class LinkDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ link }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LinkDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.link = link;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

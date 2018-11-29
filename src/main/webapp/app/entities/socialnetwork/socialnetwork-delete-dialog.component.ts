import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISocialnetwork } from 'app/shared/model/socialnetwork.model';
import { SocialnetworkService } from './socialnetwork.service';

@Component({
    selector: 'jhi-socialnetwork-delete-dialog',
    templateUrl: './socialnetwork-delete-dialog.component.html'
})
export class SocialnetworkDeleteDialogComponent {
    socialnetwork: ISocialnetwork;

    constructor(
        private socialnetworkService: SocialnetworkService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.socialnetworkService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'socialnetworkListModification',
                content: 'Deleted an socialnetwork'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-socialnetwork-delete-popup',
    template: ''
})
export class SocialnetworkDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ socialnetwork }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SocialnetworkDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.socialnetwork = socialnetwork;
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

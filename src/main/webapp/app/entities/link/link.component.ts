import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILink } from 'app/shared/model/link.model';
import { Principal } from 'app/core';
import { LinkService } from './link.service';

@Component({
    selector: 'jhi-link',
    templateUrl: './link.component.html'
})
export class LinkComponent implements OnInit, OnDestroy {
    links: ILink[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private linkService: LinkService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.linkService.query().subscribe(
            (res: HttpResponse<ILink[]>) => {
                this.links = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLinks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILink) {
        return item.id;
    }

    registerChangeInLinks() {
        this.eventSubscriber = this.eventManager.subscribe('linkListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

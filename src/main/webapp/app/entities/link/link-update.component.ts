import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILink } from 'app/shared/model/link.model';
import { LinkService } from './link.service';
import { ISocialnetwork } from 'app/shared/model/socialnetwork.model';
import { SocialnetworkService } from 'app/entities/socialnetwork';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-link-update',
    templateUrl: './link-update.component.html'
})
export class LinkUpdateComponent implements OnInit {
    link: ILink;
    isSaving: boolean;

    socialnetworks: ISocialnetwork[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private linkService: LinkService,
        private socialnetworkService: SocialnetworkService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ link }) => {
            this.link = link;
        });
        this.socialnetworkService.query().subscribe(
            (res: HttpResponse<ISocialnetwork[]>) => {
                this.socialnetworks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.link.id !== undefined) {
            this.subscribeToSaveResponse(this.linkService.update(this.link));
        } else {
            this.subscribeToSaveResponse(this.linkService.create(this.link));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILink>>) {
        result.subscribe((res: HttpResponse<ILink>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSocialnetworkById(index: number, item: ISocialnetwork) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}

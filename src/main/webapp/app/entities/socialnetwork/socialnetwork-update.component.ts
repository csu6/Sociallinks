import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISocialnetwork } from 'app/shared/model/socialnetwork.model';
import { SocialnetworkService } from './socialnetwork.service';

@Component({
    selector: 'jhi-socialnetwork-update',
    templateUrl: './socialnetwork-update.component.html'
})
export class SocialnetworkUpdateComponent implements OnInit {
    socialnetwork: ISocialnetwork;
    isSaving: boolean;

    constructor(private socialnetworkService: SocialnetworkService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ socialnetwork }) => {
            this.socialnetwork = socialnetwork;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.socialnetwork.id !== undefined) {
            this.subscribeToSaveResponse(this.socialnetworkService.update(this.socialnetwork));
        } else {
            this.subscribeToSaveResponse(this.socialnetworkService.create(this.socialnetwork));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISocialnetwork>>) {
        result.subscribe((res: HttpResponse<ISocialnetwork>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

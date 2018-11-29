import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISocialnetwork } from 'app/shared/model/socialnetwork.model';

@Component({
    selector: 'jhi-socialnetwork-detail',
    templateUrl: './socialnetwork-detail.component.html'
})
export class SocialnetworkDetailComponent implements OnInit {
    socialnetwork: ISocialnetwork;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ socialnetwork }) => {
            this.socialnetwork = socialnetwork;
        });
    }

    previousState() {
        window.history.back();
    }
}

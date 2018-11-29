import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILink } from 'app/shared/model/link.model';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { Principal } from 'app/core';
import { ProfileService } from './profile.service';
import { UserExtraService } from '../../entities/user-extra/user-extra.service';

@Component({
    selector: 'jhi-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
    links: ILink[];
    currentAccount: any;
    userExtras: any;
    eventSubscriber: Subscription;

    constructor(
        private userExtraService: UserExtraService,
        private profileService: ProfileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.userExtraService.findUserInfo().subscribe(
            (res: HttpResponse<IUserExtra>) => {
                this.userExtras = this.copyUserExtra(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.profileService.query().subscribe(
            (res: HttpResponse<ILink[]>) => {
                this.links = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = this.copyAccount(account);
        });
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    copyUserExtra(userExtra) {
        return {
            description: userExtra.description,
            photo: userExtra.photo
                ? 'data:image/png;base64,' + userExtra.photo
                : 'https://image.freepik.com/free-icon/profile-user-silhouette_318-40557.jpg'
        };
    }
    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}

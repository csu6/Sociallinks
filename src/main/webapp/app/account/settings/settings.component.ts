import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiLanguageService, JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { UserExtraService } from '../../entities/user-extra/user-extra.service';

import { IUserExtra } from 'app/shared/model/user-extra.model';
import { Principal, AccountService, JhiLanguageHelper } from 'app/core';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    userExtras: any;
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];

    constructor(
        private userExtraService: UserExtraService,
        private jhiAlertService: JhiAlertService,
        private account: AccountService,
        private principal: Principal,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper
    ) {}

    loadUserExtra() {
        this.userExtraService.findUserInfo().subscribe(
            (res: HttpResponse<IUserExtra>) => {
                this.userExtras = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadUserExtra();
        this.principal.identity().then(account => {
            this.settingsAccount = this.copyAccount(account);
        });
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
    }

    save() {
        this.account.save(this.settingsAccount).subscribe(
            () => {
                this.error = null;
                this.success = 'OK';
                this.principal.identity(true).then(account => {
                    this.settingsAccount = this.copyAccount(account);
                });
                this.languageService.getCurrent().then(current => {
                    if (this.settingsAccount.langKey !== current) {
                        this.languageService.changeLanguage(this.settingsAccount.langKey);
                    }
                });
            },
            () => {
                this.success = null;
                this.error = 'ERROR';
            }
        );
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            description: account.description,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

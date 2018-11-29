import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Socialnetwork } from 'app/shared/model/socialnetwork.model';
import { SocialnetworkService } from './socialnetwork.service';
import { SocialnetworkComponent } from './socialnetwork.component';
import { SocialnetworkDetailComponent } from './socialnetwork-detail.component';
import { SocialnetworkUpdateComponent } from './socialnetwork-update.component';
import { SocialnetworkDeletePopupComponent } from './socialnetwork-delete-dialog.component';
import { ISocialnetwork } from 'app/shared/model/socialnetwork.model';

@Injectable({ providedIn: 'root' })
export class SocialnetworkResolve implements Resolve<ISocialnetwork> {
    constructor(private service: SocialnetworkService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Socialnetwork> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Socialnetwork>) => response.ok),
                map((socialnetwork: HttpResponse<Socialnetwork>) => socialnetwork.body)
            );
        }
        return of(new Socialnetwork());
    }
}

export const socialnetworkRoute: Routes = [
    {
        path: 'socialnetwork',
        component: SocialnetworkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sociallinksApp.socialnetwork.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'socialnetwork/:id/view',
        component: SocialnetworkDetailComponent,
        resolve: {
            socialnetwork: SocialnetworkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sociallinksApp.socialnetwork.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'socialnetwork/new',
        component: SocialnetworkUpdateComponent,
        resolve: {
            socialnetwork: SocialnetworkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sociallinksApp.socialnetwork.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'socialnetwork/:id/edit',
        component: SocialnetworkUpdateComponent,
        resolve: {
            socialnetwork: SocialnetworkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sociallinksApp.socialnetwork.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const socialnetworkPopupRoute: Routes = [
    {
        path: 'socialnetwork/:id/delete',
        component: SocialnetworkDeletePopupComponent,
        resolve: {
            socialnetwork: SocialnetworkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sociallinksApp.socialnetwork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

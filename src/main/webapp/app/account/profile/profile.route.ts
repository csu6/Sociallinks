import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { ProfileComponent } from './profile.component';

export const profileRoute: Route = {
    path: 'profile',
    component: ProfileComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'global.menu.account.profile'
    },
    canActivate: [UserRouteAccessService]
};

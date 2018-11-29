import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SociallinksSharedModule } from 'app/shared';
import {
    SocialnetworkComponent,
    SocialnetworkDetailComponent,
    SocialnetworkUpdateComponent,
    SocialnetworkDeletePopupComponent,
    SocialnetworkDeleteDialogComponent,
    socialnetworkRoute,
    socialnetworkPopupRoute
} from './';

const ENTITY_STATES = [...socialnetworkRoute, ...socialnetworkPopupRoute];

@NgModule({
    imports: [SociallinksSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SocialnetworkComponent,
        SocialnetworkDetailComponent,
        SocialnetworkUpdateComponent,
        SocialnetworkDeleteDialogComponent,
        SocialnetworkDeletePopupComponent
    ],
    entryComponents: [
        SocialnetworkComponent,
        SocialnetworkUpdateComponent,
        SocialnetworkDeleteDialogComponent,
        SocialnetworkDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SociallinksSocialnetworkModule {}

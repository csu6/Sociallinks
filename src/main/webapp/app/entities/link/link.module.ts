import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SociallinksSharedModule } from 'app/shared';
import { SociallinksAdminModule } from 'app/admin/admin.module';
import {
    LinkComponent,
    LinkDetailComponent,
    LinkUpdateComponent,
    LinkDeletePopupComponent,
    LinkDeleteDialogComponent,
    linkRoute,
    linkPopupRoute
} from './';

const ENTITY_STATES = [...linkRoute, ...linkPopupRoute];

@NgModule({
    imports: [SociallinksSharedModule, SociallinksAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LinkComponent, LinkDetailComponent, LinkUpdateComponent, LinkDeleteDialogComponent, LinkDeletePopupComponent],
    entryComponents: [LinkComponent, LinkUpdateComponent, LinkDeleteDialogComponent, LinkDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SociallinksLinkModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SociallinksUserExtraModule } from './user-extra/user-extra.module';
import { SociallinksSocialnetworkModule } from './socialnetwork/socialnetwork.module';
import { SociallinksLinkModule } from './link/link.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SociallinksUserExtraModule,
        SociallinksSocialnetworkModule,
        SociallinksLinkModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SociallinksEntityModule {}

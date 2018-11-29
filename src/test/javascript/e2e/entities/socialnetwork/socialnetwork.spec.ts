/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SocialnetworkComponentsPage, SocialnetworkDeleteDialog, SocialnetworkUpdatePage } from './socialnetwork.page-object';

const expect = chai.expect;

describe('Socialnetwork e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let socialnetworkUpdatePage: SocialnetworkUpdatePage;
    let socialnetworkComponentsPage: SocialnetworkComponentsPage;
    let socialnetworkDeleteDialog: SocialnetworkDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Socialnetworks', async () => {
        await navBarPage.goToEntity('socialnetwork');
        socialnetworkComponentsPage = new SocialnetworkComponentsPage();
        expect(await socialnetworkComponentsPage.getTitle()).to.eq('sociallinksApp.socialnetwork.home.title');
    });

    it('should load create Socialnetwork page', async () => {
        await socialnetworkComponentsPage.clickOnCreateButton();
        socialnetworkUpdatePage = new SocialnetworkUpdatePage();
        expect(await socialnetworkUpdatePage.getPageTitle()).to.eq('sociallinksApp.socialnetwork.home.createOrEditLabel');
        await socialnetworkUpdatePage.cancel();
    });

    it('should create and save Socialnetworks', async () => {
        const nbButtonsBeforeCreate = await socialnetworkComponentsPage.countDeleteButtons();

        await socialnetworkComponentsPage.clickOnCreateButton();
        await promise.all([socialnetworkUpdatePage.setTitleInput('title'), socialnetworkUpdatePage.setUrlInput('url')]);
        expect(await socialnetworkUpdatePage.getTitleInput()).to.eq('title');
        expect(await socialnetworkUpdatePage.getUrlInput()).to.eq('url');
        const selectedStatus = socialnetworkUpdatePage.getStatusInput();
        if (await selectedStatus.isSelected()) {
            await socialnetworkUpdatePage.getStatusInput().click();
            expect(await socialnetworkUpdatePage.getStatusInput().isSelected()).to.be.false;
        } else {
            await socialnetworkUpdatePage.getStatusInput().click();
            expect(await socialnetworkUpdatePage.getStatusInput().isSelected()).to.be.true;
        }
        await socialnetworkUpdatePage.save();
        expect(await socialnetworkUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await socialnetworkComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Socialnetwork', async () => {
        const nbButtonsBeforeDelete = await socialnetworkComponentsPage.countDeleteButtons();
        await socialnetworkComponentsPage.clickOnLastDeleteButton();

        socialnetworkDeleteDialog = new SocialnetworkDeleteDialog();
        expect(await socialnetworkDeleteDialog.getDialogTitle()).to.eq('sociallinksApp.socialnetwork.delete.question');
        await socialnetworkDeleteDialog.clickOnConfirmButton();

        expect(await socialnetworkComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

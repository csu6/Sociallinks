/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LinkComponentsPage, LinkDeleteDialog, LinkUpdatePage } from './link.page-object';

const expect = chai.expect;

describe('Link e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let linkUpdatePage: LinkUpdatePage;
    let linkComponentsPage: LinkComponentsPage;
    let linkDeleteDialog: LinkDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Links', async () => {
        await navBarPage.goToEntity('link');
        linkComponentsPage = new LinkComponentsPage();
        expect(await linkComponentsPage.getTitle()).to.eq('sociallinksApp.link.home.title');
    });

    it('should load create Link page', async () => {
        await linkComponentsPage.clickOnCreateButton();
        linkUpdatePage = new LinkUpdatePage();
        expect(await linkUpdatePage.getPageTitle()).to.eq('sociallinksApp.link.home.createOrEditLabel');
        await linkUpdatePage.cancel();
    });

    it('should create and save Links', async () => {
        const nbButtonsBeforeCreate = await linkComponentsPage.countDeleteButtons();

        await linkComponentsPage.clickOnCreateButton();
        await promise.all([
            linkUpdatePage.setTitleInput('title'),
            linkUpdatePage.setDescriptionInput('description'),
            linkUpdatePage.setUrlInput('url'),
            linkUpdatePage.socialnetworkSelectLastOption(),
            linkUpdatePage.userSelectLastOption()
        ]);
        expect(await linkUpdatePage.getTitleInput()).to.eq('title');
        expect(await linkUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await linkUpdatePage.getUrlInput()).to.eq('url');
        await linkUpdatePage.save();
        expect(await linkUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await linkComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Link', async () => {
        const nbButtonsBeforeDelete = await linkComponentsPage.countDeleteButtons();
        await linkComponentsPage.clickOnLastDeleteButton();

        linkDeleteDialog = new LinkDeleteDialog();
        expect(await linkDeleteDialog.getDialogTitle()).to.eq('sociallinksApp.link.delete.question');
        await linkDeleteDialog.clickOnConfirmButton();

        expect(await linkComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

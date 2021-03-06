import { element, by, ElementFinder } from 'protractor';

export class LinkComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-link div table .btn-danger'));
    title = element.all(by.css('jhi-link div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LinkUpdatePage {
    pageTitle = element(by.id('jhi-link-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    descriptionInput = element(by.id('field_description'));
    urlInput = element(by.id('field_url'));
    socialnetworkSelect = element(by.id('field_socialnetwork'));
    userSelect = element(by.id('field_user'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setUrlInput(url) {
        await this.urlInput.sendKeys(url);
    }

    async getUrlInput() {
        return this.urlInput.getAttribute('value');
    }

    async socialnetworkSelectLastOption() {
        await this.socialnetworkSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async socialnetworkSelectOption(option) {
        await this.socialnetworkSelect.sendKeys(option);
    }

    getSocialnetworkSelect(): ElementFinder {
        return this.socialnetworkSelect;
    }

    async getSocialnetworkSelectedOption() {
        return this.socialnetworkSelect.element(by.css('option:checked')).getText();
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class LinkDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-link-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-link'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

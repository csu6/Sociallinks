import { element, by, ElementFinder } from 'protractor';

export class UserExtraComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-user-extra div table .btn-danger'));
    title = element.all(by.css('jhi-user-extra div h2#page-heading span')).first();

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

export class UserExtraUpdatePage {
    pageTitle = element(by.id('jhi-user-extra-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    photoInput = element(by.id('file_photo'));
    phoneInput = element(by.id('field_phone'));
    descriptionInput = element(by.id('field_description'));
    genderSelect = element(by.id('field_gender'));
    userSelect = element(by.id('field_user'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setPhotoInput(photo) {
        await this.photoInput.sendKeys(photo);
    }

    async getPhotoInput() {
        return this.photoInput.getAttribute('value');
    }

    async setPhoneInput(phone) {
        await this.phoneInput.sendKeys(phone);
    }

    async getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setGenderSelect(gender) {
        await this.genderSelect.sendKeys(gender);
    }

    async getGenderSelect() {
        return this.genderSelect.element(by.css('option:checked')).getText();
    }

    async genderSelectLastOption() {
        await this.genderSelect
            .all(by.tagName('option'))
            .last()
            .click();
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

export class UserExtraDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-userExtra-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-userExtra'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

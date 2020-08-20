let path = require('path');
let autoReloadJson = require('auto-reload-json');

let EC = protractor.ExpectedConditions;
let environmentJSONFile = path.resolve(__dirname, './../environment.json')
let environmentJSON = autoReloadJson(environmentJSONFile);

const files_po = function () {
    //Element Declaration
    let elm_newFolder_create_button = element(by.css('button[data-automation-id="create-new-folder"] span'));
    let elm_newFolderInput_nameField = element(by.id("adf-folder-name-input"));
    let elm_newFolder_submitButton = element(by.css("#adf-folder-create-button"));
    let elm_newFolderName_afterCreation = element(by.css('span[title=' + environmentJSON.gitUserName + ']'));
    let elm_newFolder_cancelButton = element(by.css("#adf-folder-cancel-button"));
    let elm_selected_img = element(by.css('adf-datatable-row[aria-label^="' + environmentJSON.gitUserName + '"] mat-icon[role="img"][svgicon="selected"]'));
    let elm_options_img = element(by.css('adf-datatable-row[aria-label^="' + environmentJSON.gitUserName + '"] button[title="Content actions"]'));
    let elm_delete_option = element(by.css('button[aria-label="Delete"][data-automation-id="DOCUMENT_LIST.ACTIONS.FOLDER.DELETE"]'));


    //Expected Conditions to wait for the Element Visibility / Presence in the DOM
    let ec_filesPage_wait = EC.and(EC.visibilityOf(elm_newFolder_create_button));
    let ec_newFolder_nameInput_wait = EC.and(EC.visibilityOf(elm_newFolderInput_nameField));
    let ec_newFolder_afterCreate_wait = EC.and(EC.visibilityOf(elm_newFolderName_afterCreation));
    let ec_selected_img_wait = EC.and(EC.visibilityOf(elm_selected_img));
    let ec_delete_option_wait = EC.and(EC.visibilityOf(elm_delete_option));
    let ec_options_img_wait = EC.and(EC.visibilityOf(elm_options_img));
    let ec_newFolder_cancelButton_wait = EC.and(EC.visibilityOf(elm_newFolder_cancelButton));

    this.navigateToFiles = async () => {
        await browser.navigate().to(environmentJSON.url + "files");
        await browser.refresh();
        await browser.wait(ec_filesPage_wait, browser.params.expectedWaitTime, "Files page navigation is having issue");
        return browser.getCurrentUrl();
    };

    this.createNewFolder = async () => {
        let tempValue = 0;
        await elm_newFolder_create_button.click();
        await browser.wait(ec_newFolder_nameInput_wait, browser.params.expectedWaitTime, "Unable to Click New Folder");
        await elm_newFolderInput_nameField.sendKeys(environmentJSON.gitUserName);
        await elm_newFolder_submitButton.click();
        await browser.wait(ec_newFolder_afterCreate_wait, browser.params.expectedWaitTime, "Not Able to Submit the New Folder");
        await element.all(by.css('adf-datatable-row div[title="Display name"]')).each(async (elm, index) => {
            await elm.getText().then(async (folderName) => {
                if (folderName === environmentJSON.gitUserName) {
                    tempValue = 1;
                }
            });
        });
        if (await tempValue) {
            return true;
        }
        else
            return false;
    };

    this.duplicateFolderNameValidation = async () => {
        await elm_newFolder_create_button.click();
        await browser.wait(ec_newFolder_nameInput_wait, browser.params.expectedWaitTime, "Unable to Click New Folder");
        await elm_newFolderInput_nameField.sendKeys(environmentJSON.gitUserName);
        await elm_newFolder_submitButton.click();
    };

    this.deleteCreatedFolder = async () => {
        await browser.wait(ec_newFolder_cancelButton_wait, browser.params.expectedWaitTime, "Cancel Button Not Available");
        await elm_newFolder_cancelButton.click();
        await browser.wait(ec_newFolder_afterCreate_wait, browser.params.expectedWaitTime, "Cancel Button unable to click");
        await elm_newFolderName_afterCreation.click();
        await browser.wait(ec_selected_img_wait, browser.params.expectedWaitTime, "Unable to select the created folder");
        await browser.wait(ec_options_img_wait, browser.params.expectedWaitTime, "Options image is not visible");
        await elm_options_img.click();
        await browser.wait(ec_delete_option_wait, browser.params.expectedWaitTime, "Delete option from Actions is not visible");
        await elm_delete_option.click();
    };

    this.validateAfterDelete = async () => {
        let tempValue = 0;
        await element.all(by.css('adf-datatable-row div[title="Display name"]')).each(async (elm, index) => {
            await elm.getText().then(async (folderNames) => {
                if (folderNames === environmentJSON.gitUserName) {
                    tempValue = 1;
                }
            });
        });
        if (await !tempValue) {
            return true;
        }
        else
            return false;
    };
}
module.exports = new files_po
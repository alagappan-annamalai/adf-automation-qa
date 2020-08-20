// spec.js

let path = require('path');
let autoReloadJson = require('auto-reload-json');
let environmentJSONFile = path.resolve(__dirname, './environment.json')
let environmentJSON = autoReloadJson(environmentJSONFile);

let PO_settings = require('./page-objects/settings-po');
let PO_login = require('./page-objects/login-po');
let PO_files = require('./page-objects/files-po');

describe('ADF Demo App', () => {

  it('Provider Selection from the Settings Page', async () => {
    await expect(PO_settings.pageLoad(environmentJSON.url + "settings")).toEqual(environmentJSON.settingsPageTitle);
    await expect(PO_settings.providerSelection()).toEqual(environmentJSON.provider);
    await expect(PO_settings.submitProviderSelection()).toEqual(environmentJSON.loginURL);
  });

  it('Login to the Application', async () => {
    await expect(PO_login.login(environmentJSON.userName, environmentJSON.password)).toEqual(environmentJSON.landingPage);
  });

  it('Create a new folder and perform actions on it', async () => {
    await expect(PO_files.navigateToFiles()).toEqual(environmentJSON.filesPage);
    await expect(PO_files.createNewFolder()).toBe(true);
    await PO_files.duplicateFolderNameValidation();
    await PO_files.deleteCreatedFolder();
 });

  it('Validating After Deletion', async () => {
    await expect(PO_files.validateAfterDelete()).toBeTruthy();
  });
});

let EC = protractor.ExpectedConditions;

const settings_po = function () {
    //Element Declaration
    let elm_provider = element(by.css('.mat-select-value.ng-tns-c134-1'));
    let elm_provider_ECM_selection = element(by.cssContainingText('.mat-option-text', "ECM"));
    let elm_inserted = element.all(by.css('.ng-tns-c134-1.ng-star-inserted')).get(0);
    let elm_apply_button = element(by.cssContainingText('.mat-button-wrapper', "APPLY"));

    //Functions
    this.pageLoad = async (url) => {
        await browser.get(url);
        return browser.getTitle();
    };

    this.providerSelection = async () => {
        await elm_provider.click();
        await elm_provider_ECM_selection.click();
        return elm_inserted.getText();
    };

    this.submitProviderSelection = async () => {
        await elm_apply_button.click();
        return browser.getCurrentUrl();
    };
}
module.exports = new settings_po
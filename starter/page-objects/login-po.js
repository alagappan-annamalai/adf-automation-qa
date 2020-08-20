
let EC = protractor.ExpectedConditions;

const login_po = function () {
    //Element Declaration
    let elm_userName = element(by.id("username"));
    let elm_password = element(by.id("password"));
    let elm_signInButton = element(by.id("login-button"));
    let elm_landingPage = element(by.className('mat-h1'));

    //Expected Conditions to wait for the Element Visibility / Presence in the DOM
    let ec_userName_wait = EC.and(EC.visibilityOf(elm_userName));
    let ec_landingPage_wait = EC.and(EC.visibilityOf(elm_landingPage));

    //Functions
    this.login = async (userName,password) => {
        browser.wait(ec_userName_wait, browser.params.expectedWaitTime, "Login Page Not Loaded");
        await elm_userName.sendKeys(userName);
        await elm_password.sendKeys(password);
        await elm_signInButton.isEnabled().then(async (result) => {
            if (result) {
                await elm_signInButton.click();
            }
            else {
                console.log("Sign In Button is not Enabled");
            }
        });
        await browser.wait(ec_landingPage_wait, browser.params.expectedWaitTime, "Home Page After login is Unsuccessful");
        return browser.getCurrentUrl();
    };
}
module.exports = new login_po
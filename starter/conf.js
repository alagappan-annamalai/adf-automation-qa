// conf.js
let specReporter = require('jasmine-spec-reporter').SpecReporter;
let path = require('path');
let beautifulHtmlReporter = require('protractor-beautiful-reporter');
let currentDate = new Date();
let dateString = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + (currentDate.getYear() + 1900) + '-' + currentDate.getHours() + 'hrs-' + currentDate.getMinutes() + 'min-' + currentDate.getUTCSeconds() + 'sec';
let reportDir = path.resolve(__dirname, './reports/'+dateString);
require("babel-register")({
    "presets": ["es2015"]
});

exports.config = {
    specs: ['spec.js'],
    framework: 'jasmine',
    directConnect: true,
    chromeDriver: './chromedriver.exe',
    onPrepare: () => {
        // set browser size...
        browser.manage().window().setSize(1024, 800);

        // better jasmine 2 reports...
        const SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new specReporter({ displayStacktrace: 'specs' }));
        let originalJasmine2MetaDataBuilder = new beautifulHtmlReporter({
            baseDirectory: './../'
        })['jasmine2MetaDataBuilder'];
        jasmine.getEnv().addReporter(
            new beautifulHtmlReporter({
                baseDirectory: reportDir,
                docTitle: 'HTML Report',
                docName: 'index.html',
                gatherBrowserLogs: true,
                showSummary: true,
                showQuickLinks: true,
                showConfiguration: true,
                screenshotsSubfolder: 'images',
                jsonsSubfolder: 'jsons',
                clientDefaults: {
                    showTotalDurationIn: 'header',
                    totalDurationFormat: 'h:m:s'
                },
                jasmine2MetaDataBuilder: function (spec, descriptions, results, capabilities) {
                    if (
                        results &&
                        results.failedExpectations &&
                        results.failedExpectations.length > 0 &&
                        'Failed: => marked Pending' === results.failedExpectations[0].message
                    ) {
                        results.pendingReason = 'Marked Pending with pending()';
                        results.status = 'pending';
                        results.failedExpectations = [];
                    }
                    return originalJasmine2MetaDataBuilder(spec, descriptions, results, capabilities);
                },
                preserveDirectory: false
            }).getJasmine2Reporter()
        );
        params: {
            expectedWaitTime = "5000";
        }
    },

    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 2,
        chromeOptions: {
            args: [
                // disable chrome's wakiness
                '--disable-infobars',
                '--disable-extensions',
                'verbose',
                'log-path=/tmp/chromedriver.log'
            ],
            prefs: {
                // disable chrome's annoying password manager
                'profile.password_manager_enabled': false,
                'credentials_enable_service': false,
                'password_manager_enabled': false
            }
        }
    },

    jasmineNodeOpts: {
        showColors: true,
        displaySpecDuration: true,
        // overrides jasmine's print method to report dot syntax for custom reports
        print: () => { },
        defaultTimeoutInterval: 50000
    }

};

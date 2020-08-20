## Prerequisites
- install Node 
- `npm install -g protractor` to install protractor
- Go to the folder level "starter" [`cd starter`], since all the files and folders are placed in it.
- `npm install` to install the project dependencies
- Update the Chrome Browser to the latest version [Used Version is Chrome 84]

## Description
- run tests: `npm test`

## Explanation
- In the Configuration I have used the parameter directConnect:true which will use the Chrome Driver directly instead of 
running Selenium Server at the background. By using this directConnect, the element interaction will be 
quicker since the intermediate communication protocol (Selenium Server) is eliminated.
- I have downloaded the chrome driver and packaged with the project.
- Used package.json to store all the dependancies and the test run script also mentioned. 
- All the static values are stored in the environment.json file and reading the json using auto-reload-json node module.
By this way, the Page Object / spec file could use these json files and any modification can be done to the json file
instead of modifying Spec / page object files.
- Created 3 Page Objects for each page.
- Identified the web elements and stored with elm_ pattern.
- Functions to interact with the web elements are placed in the appropriate Page object spec files.
- Used Expected conditions at appropriate places to avoid the static sleep. Expected variables are stored with ec_ pattern.
- Used Protractor-beautiful-reporter node module for the reporting. This will store the reports under reports/ folder
with current Date and TimeStamp. In this reporter we can get the reports along with screenshots after every TestCase under it syntax.
This node module will capture the console errors too which will be helpful for the QA to file bugs while the Automation navigate through the pages.

- Included .gitignore file with the node_modules in it which will not push to the Git while commit. [Even the Reports folder can be placed here, for this repo currently I'm not placing it over there inorder to showcase it]  
- Sample Output:

ADF Demo App
    √ Provider Selection from the Settings Page
    √ Login to the Application
    √ Create a new folder and perform actions on it
    √ Validating After Deletion

Executed 4 of 4 specs SUCCESS in 23 secs.


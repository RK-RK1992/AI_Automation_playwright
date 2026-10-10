
const { After, Before, AfterStep, BeforeStep, Status } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const { POManager } = require('../../pageObject/POManager');


Before(async function () {
    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});


After(async function () {
    //  await this.page.deleteCookie();
    console.log("--------last execution.........");
});

BeforeStep(function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
});

const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager.js');

test('@Web Practice login and verify iPhone X product', async ({ page }) => {
    const poManager = new POManager(page);
    const practiceLoginPage = poManager.getPracticeLoginPage();

    await practiceLoginPage.goToThePage();
    await practiceLoginPage.loginToTheApp('rahulshettyacademy', 'Learning@830$3mK2');

    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    await poManager.getShopPage().verifyProductIsDisplayed();
});

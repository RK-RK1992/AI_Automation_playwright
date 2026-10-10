import { test, expect } from '@playwright/test';
import { POManager } from '../pageObject_ts/POManager';
import { customTest } from '../Utils_ts/test-base';
const placeOrderData = JSON.parse(JSON.stringify(require('../Utils_ts/placeOrderTestData.json')));



for (const dataSet of placeOrderData) {
    test(`@Web Practice Scenarios Playwright test ${dataSet.productName}`, async ({ page }) => {

        const userName = dataSet.userName;
        const passWord = dataSet.passWord;
        const productName = dataSet.productName;
        const countryName = dataSet.countryName;
        const countryCode = dataSet.countryCode;

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();

        await loginPage.goToThePage();
        console.log(await page.title());

        await loginPage.loginToTheApp(userName, passWord);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddToCart(productName);

        // await this.page.locator(".toast-success").textContent();
        // await expect(this.page.locator(".toast-success")).toContainText('Product Added To Cart');
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(productName);
        await cartPage.Checkout();

        //checkout page
        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.verifyTheProductIsDisplayed(productName);
        await checkoutPage.enterCardDetails('003', 'Ram Mohan');
        await checkoutPage.applyCouponAndVerify('rahulshettyacademy');

        await checkoutPage.verifyEmailField(userName);

        // dropdown selection
        await checkoutPage.selectCountryFromDropdown(countryCode, countryName);

        await checkoutPage.clickOnSubmitButton();

        //  const thankYouMessage = ' Thankyou for the order. ';
        const ordersReviewPage = poManager.getOrdersReviewPage();
        // await ordersReviewPage.verifyTheProductIsDisplayed(productName);
        // await ordersReviewPage.verifyThankYouMessage(thankYouMessage);
        const orderID = await ordersReviewPage.getOrderID();
        console.log(orderID);
    });

}


customTest('Practice Scenario3 Playwright test with custom test', async ({ page, testDataForOrder }) => {

    const userName = testDataForOrder.userName;
    const passWord = testDataForOrder.passWord;
    const productName = testDataForOrder.productName;
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    await loginPage.goToThePage();
    console.log(await page.title());

    await loginPage.loginToTheApp(userName, passWord);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(productName);

    // await this.page.locator(".toast-success").textContent();
    // await expect(this.page.locator(".toast-success")).toContainText('Product Added To Cart');
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});


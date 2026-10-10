const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test');




Given('A login to the ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (userName, passWord) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goToThePage();
    console.log(await this.page.title());
    await loginPage.loginToTheApp(userName, passWord);
});

When('Add {string} to the cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddToCart(productName);
});

Then('Validate the product is {string} added to the cart', async function (productName) {
    await this.dashboardPage.navigateToCart();
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.VerifyProductIsDisplayed(productName);
});

When('Enter valid details and place the order', async function () {
    await this.cartPage.Checkout();
    this.checkoutPage = this.poManager.getCheckoutPage();
    await this.checkoutPage.verifyTheProductIsDisplayed("ZARA COAT 3");
    await this.checkoutPage.enterCardDetails('003', 'Ram Mohan');
    await this.checkoutPage.applyCouponAndVerify('rahulshettyacademy');

   // await this.checkoutPage.verifyEmailField("rohitkush38@gmail.com");

    // dropdown selection
    await this.checkoutPage.selectCountryFromDropdown("Ind", " India");
    await this.checkoutPage.clickOnSubmitButton();
});

Then('Verify order is present in order history page', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    // await ordersReviewPage.verifyTheProductIsDisplayed(productName);
    // await ordersReviewPage.verifyThankYouMessage(thankYouMessage);
    const orderID = await ordersReviewPage.getOrderID();
    console.log(orderID);
    this.dashboardPage.navigateToOrders();
    // const orderHistoryPage = this.poManager.getOrdersHistoryPage();
    // await orderHistoryPage.searchOrderAndSelect(orderID);
    // expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});

Given('A login to the ecommerce2 application with {string} and {string}', async function (userName, passWord) {
    // Write code here that turns the phrase above into concrete actions
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await expect(await this.page.title()).toBe("LoginPage Practise | Rahul Shetty Academy");
    await this.page.locator('#username').fill(userName);
    await this.page.locator('#password').fill(passWord);
    await this.page.locator('#signInBtn').click();
});

Then('Verify the error message is displayed', async function () {
    console.log(await this.page.locator('[style*="block"]').textContent());
    await expect(this.page.locator('[style*="block"]')).toContainText('Incorrect');
});


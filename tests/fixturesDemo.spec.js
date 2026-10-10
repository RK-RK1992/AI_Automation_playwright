const { expect } = require('@playwright/test');
const { customtest } = require('../Utils/fixtures.js');

customtest('@Web Fixture demo', async ({ authenticatedPage, createOrderPage }) => {


    await authenticatedPage.goto('https://rahulshettyacademy.com/client');
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    console.log(createOrderPage.orderID);
    await expect(authenticatedPage.getByText(createOrderPage.orderID)).toBeVisible();

});

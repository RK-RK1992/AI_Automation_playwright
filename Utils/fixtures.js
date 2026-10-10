const base = require('@playwright/test');
const { APiUtils } = require('../Utils/APiUtils');
const { request } = require('@playwright/test');


const reuestPayload = { userEmail: "rohitkush38@gmail.com", userPassword: "Password@1" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };



exports.customtest = base.test.extend({


    authenticatedPage: async ({ page }, use) => {


        const userName = page.locator('#userEmail');
        const passWord = page.locator('#userPassword');
        const signInBtn = page.locator('#login');

        await page.goto('https://rahulshettyacademy.com/client');
        console.log(await page.title());
       // await expect(page.toHaveTitle("Let's Shop"));
        await userName.fill('rohitkush38@gmail.com');
        await passWord.fill('Password@1');
        await signInBtn.click();
        await page.waitForLoadState('networkidle');

        await use(page);

    },

    createOrderPage : async ({},use) => {

        const apiContext = await request.newContext();
        const apiUtils = new APiUtils(apiContext, reuestPayload);
        const response = await apiUtils.createOrder(orderPayload);
        console.log(response);
        await use(response);

    }

});



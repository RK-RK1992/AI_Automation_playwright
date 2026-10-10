const {test , expect , request} = require('@playwright/test');
const {APiUtils} = require('../Utils/APiUtils');


const reuestPayload = { userEmail:"rohitkush38@gmail.com",userPassword:"Password@1"};
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};

let response;


test.beforeAll( async () => {
 
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,reuestPayload);
    response = await apiUtils.createOrder(orderPayload);
});


test('@API Create order and login using API and verify Order ID in UI and also using new class', async ({ page }) => {
   //js file- Login js, DashboardPage
   await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
   },response.token);

   await page.goto("https://rahulshettyacademy.com/client");
   
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
   

    for(let i=0; i<await rows.count(); ++i){
        
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if(response.orderID.includes(rowOrderID)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

   const orderIdDetails = await page.locator(".col-text").textContent();
   console.log(orderIdDetails);
});
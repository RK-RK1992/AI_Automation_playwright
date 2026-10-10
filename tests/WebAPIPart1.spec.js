const {test , expect , request} = require('@playwright/test');

const reuestPayload = { userEmail:"rohitkush38@gmail.com",userPassword:"Password@1"};
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};

let token;
let orderID;


test.beforeAll( async () => {
 
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        data:reuestPayload
    })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:orderPayload, headers:{
            'Authorization':token,
            'Content-Type':'application/json'
        }
});
    const orderResponseJson = await orderResponse.json();
    orderID = orderResponseJson.orders[0];
    console.log(orderResponseJson);
    console.log(orderID);
});

test('Create order and login using API and verify Order ID in UI', async ({ page }) => {
   //js file- Login js, DashboardPage
   await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
   },token);

   await page.goto("https://rahulshettyacademy.com/client");
   
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
   

    for(let i=0; i<await rows.count(); ++i){
        
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if(orderID.includes(rowOrderID)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

   const orderIdDetails = await page.locator(".col-text").textContent();
   console.log(orderIdDetails);
});
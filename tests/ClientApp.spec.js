const {test , expect} = require('@playwright/test');


test('@Web Practice Scenario1 Playwright test', async ({page}) => 
{
   
    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const signInBtn = page.locator('#login');
    const cardTitles= page.locator(".card-body b");


    await page.goto('https://rahulshettyacademy.com/client');
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
   
    await userName.type('rohitkush38@gmail.com');
    await passWord.type('Password@1');
    await signInBtn.click();
    

    // console.log(await page.locator('#toast-container').textContent());
    // await expect(page.locator('#toast-container')).toContainText('Login');
    
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());

});


test('Practice Scenario2 Playwright test', async ({page}) => 
{
   
    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const signInBtn = page.locator('#login');
    const cardTitles= page.locator(".card-body b");
    const products = page.locator('.card-body');
    const productName="ZARA COAT 3";

    await page.goto('https://rahulshettyacademy.com/client');
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop"); 
    await userName.type('rohitkush38@gmail.com');
    await passWord.type('Password@1');
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());
    const productCount = await products.count();
    console.log(productCount);
    // await page.pause();
    for(let i=0; i<productCount; ++i){
        if(await products.nth(i).locator('b').textContent() === productName){
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
   
    await page.locator(".toast-success").textContent();
    await expect(page.locator(".toast-success")).toContainText('Product Added To Cart');
    await page.locator("[routerlink='/dashboard/cart']").click();
    const cartProductText = await page.locator(".cartSection h3").textContent();
    console.log(cartProductText);
    await page.locator("div li").first().waitFor();
    const bool =await page.locator(`h3:has-text("${productName}")`).isVisible();
    expect(bool).toBeTruthy();
    await page.locator('text=Checkout').click();
    await page.locator(".form__cc").waitFor();

    //checkout page
    const bool3 =await page.locator(".item__title").textContent();
    const bool4=bool3.trim();
    console.log(bool4);
    await expect(bool4).toBe(productName);

    await page.locator(".field [type='text']").nth(1).type('003');
    await page.locator(".field [type='text']").nth(2).type('Ram Mohan');
    await page.locator(".field [type='text']").nth(3).type('rahulshettyacademy');
    await page.locator("button[type='submit']").click();
    await page.locator("p[style*=green]").waitFor();
    const bool1 =await page.locator("p[style*=green]").isVisible();
    expect(bool1).toBeTruthy();

    // dropdown selection
   await page.locator("[placeholder='Select Country']").pressSequentially("Ind", { delay: 100 });
  // await page.pause();
   await page.locator(".ta-results").waitFor();
   const dropdownCount = await page.locator(".ta-results button").count();
   console.log(dropdownCount);

    for(let i=0; i<dropdownCount; ++i){
         const text = await page.locator(".ta-results").locator('button').nth(i).textContent();
         console.log(text);
        
        if(text === " India"){
            await page.locator(".ta-results").locator('button').nth(i).click();
            break;
        }
    }
    
    await expect(page.locator(".user__name label").first()).toHaveText('rohitkush38@gmail.com');

    await page.locator(".action__submit").waitFor();
    //await page.pause();

    await page.locator(".action__submit").click();

    await page.locator(".title").first().waitFor();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID =await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
});




test('Practice Scenario3 Playwright test', async ({page}) => 
{
   
    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const signInBtn = page.locator('#login');
    const cardTitles= page.locator(".card-body b");
    const products = page.locator('.card-body');
    const productName="ZARA COAT 3";

    await page.goto('https://rahulshettyacademy.com/client');
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop"); 
    await userName.type('rohitkush38@gmail.com');
    await passWord.type('Password@1');
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());
    const productCount = await products.count();
    console.log(productCount);
    // await page.pause();
    for(let i=0; i<productCount; ++i){
        if(await products.nth(i).locator('b').textContent() === productName){
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
   
    await page.locator(".toast-success").textContent();
    await expect(page.locator(".toast-success")).toContainText('Product Added To Cart');
    await page.locator("[routerlink='/dashboard/cart']").click();
    const cartProductText = await page.locator(".cartSection h3").textContent();
    console.log(cartProductText);
    await page.locator("div li").first().waitFor();
    const bool =await page.locator(`h3:has-text("${productName}")`).isVisible();
    expect(bool).toBeTruthy();
    await page.locator('text=Checkout').click();
    await page.locator(".form__cc").waitFor();

    //checkout page
    const bool3 =await page.locator(".item__title").textContent();
    const bool4=bool3.trim();
    console.log(bool4);
    await expect(bool4).toBe(productName);

    await page.locator(".field [type='text']").nth(1).type('003');
    await page.locator(".field [type='text']").nth(2).type('Ram Mohan');
    await page.locator(".field [type='text']").nth(3).type('rahulshettyacademy');
    await page.locator("button[type='submit']").click();
    await page.locator("p[style*=green]").waitFor();
    const bool1 =await page.locator("p[style*=green]").isVisible();
    expect(bool1).toBeTruthy();

    // dropdown selection
   await page.locator("[placeholder='Select Country']").pressSequentially("Ind", { delay: 100 });
  // await page.pause();
   await page.locator(".ta-results").waitFor();
   const dropdownCount = await page.locator(".ta-results button").count();
   console.log(dropdownCount);

    for(let i=0; i<dropdownCount; ++i){
         const text = await page.locator(".ta-results").locator('button').nth(i).textContent();
         console.log(text);
        
        if(text === " India"){
            await page.locator(".ta-results").locator('button').nth(i).click();
            break;
        }
    }
    
    await expect(page.locator(".user__name label").first()).toHaveText('rohitkush38@gmail.com');

    await page.locator(".action__submit").waitFor();
    //await page.pause();

    await page.locator(".action__submit").click();

    await page.locator(".title").first().waitFor();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID =await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
    //console.log(rows);

    for(let i=0; i<await rows.count(); ++i){
        
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if(orderID.includes(rowOrderID)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
   //await page.pause();

  // console.log(orderSummaryID);
   const orderIdDetails = await page.locator(".col-text").textContent();
   console.log(orderIdDetails);
});


test('Other way Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})
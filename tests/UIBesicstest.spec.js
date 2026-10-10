const {test , expect} = require('@playwright/test');

test('Browser context Playwright test', async ({browser}) => 
{
    // chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://sso.teachable.com/secure/9521/identity/login/otp');
    console.log(await page.title());
    await expect(page).toHaveTitle('Rahul Shetty Academy');
    await expect(await page.title()).toBe('Rahul Shetty Academy');
});

test('Page Playwright test', async ({page}) => 
{
   
    await page.goto('https://gmail.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle('Gmail');
    await expect(await page.title()).toBe('Gmail');
});


test('Login Error Playwright test', async ({page}) => 
{
   
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await expect(await page.title()).toBe("LoginPage Practise | Rahul Shetty Academy");
    await page.locator('#username').fill('test@gmail.com');
    await page.locator('#password').fill('Test@123');
    await page.locator('#signInBtn').click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

});

test('@Web Login Playwright test', async ({page}) => 
{
   
    const userName = page.locator('#username');
    const passWord = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles= page.locator('.card-body a');


    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await expect(await page.title()).toBe("LoginPage Practise | Rahul Shetty Academy");
    await userName.type('rahulshettyacadem');
    await passWord.type('Learning@830$3mK2');
    await signInBtn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    // fill

    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await signInBtn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.allTextContents());

});


test('UI Control Playwright test', async ({page}) => 
{
   
    const userName = page.locator('#username');
    const passWord = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles= page.locator('.card-body a');
    const blinkText = page.locator("[href*='documents-request']");


    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await userName.type('rahulshettyacadem');
    await passWord.type('Learning@830$3mK2');
    const dropDown = page.locator('select.form-control');
    await dropDown.selectOption('Consultant');

    await page.locator('#usertype').last().click();
    await page.locator('#okayBtn').click();
    // await page.pause();
   
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();

    await page.locator('#terms').click();
    console.log(await page.locator('#terms').isChecked());
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    
// new 
    console.log(await page.locator("#username").inputValue());

    await expect(blinkText).toHaveAttribute('class','blinkingText');
    await blinkText.click();

    

});


test('Child window handling', async ({browser}) => 
{  
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const blinkText = page.locator("[href*='documents-request']");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const [newPage] = await Promise.all
    ([
    context.waitForEvent('page'),
    blinkText.click(),
   ]);

   const emailText = await newPage.locator('.red').textContent();
   console.log(emailText);
   const array = emailText.split('@')[1].trim();
   const domain = array.split(' ')[0];
//    console.log(domain);
   await userName.type(domain);
   console.log(await userName.inputValue());
//    await page.pause();
//    await page.screenshot();
   
});


test('Both Child window handling', async ({browser}) => 
{  
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const blinkText = page.locator("[href*='documents-request']");
    const techMBlinkText = page.locator("[href*='techsmarthire']");
    
    const secondPageTitle="techSmartHire – Skill-Based QA Hiring Platform | Hire by Skills, Not Resumes | techSmartHire";

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const [newPage1] = await Promise.all
    ([
    context.waitForEvent('page'),
    blinkText.click(),
   ]);

   const emailText = await newPage1.locator('.red').textContent();
   console.log(emailText);
   const array = emailText.split('@')[1].trim();
   const domain = array.split(' ')[0];
   console.log(domain);
 //  await userName.type(domain);

//    const [newPage2] = await Promise.all
//     ([       
//         context.waitForEvent('page'),
//     techMBlinkText.click(),
//    ]);

//    const expectedSecondPageTitle = await newPage2.title();
//    console.log(expectedSecondPageTitle);
//    await expect(expectedSecondPageTitle).toBe(secondPageTitle);
//    await page.pause();

   
});
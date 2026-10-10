import { test, expect } from '@playwright/test';

test('CodeGen Playwright tool to work', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Nokia Edge $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await expect(page.locator('tbody')).toContainText('Samsung Note 8');
  await expect(page.locator('tbody')).toContainText('Nokia Edge');
  await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();
  //await page.getByText('I agree with the term &').click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('India');
  await page.getByText('India').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
  await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('India');
});
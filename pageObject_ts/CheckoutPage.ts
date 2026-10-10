import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    page: Page;
    productNameInCheckout: Locator;
    cvvNumber: Locator;
    nameOnCard: Locator;
    applyCouponTextField: Locator;
    couponSuccessMessage: Locator;
    applyCouponButton: Locator;
    selectCountry: Locator;
    countryDropdown: Locator;
    countryDropdownCount: Locator;
    emailField: Locator;
    submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productNameInCheckout = page.locator(".item__title")
        this.cvvNumber = page.locator(".field [type='text']").nth(1);
        this.nameOnCard = page.locator(".field [type='text']").nth(2);
        this.applyCouponTextField = page.locator(".field [type='text']").nth(3);
        this.couponSuccessMessage = page.locator("p[style*=green]");
        this.applyCouponButton = page.locator("button[type='submit']");
        //dropdown selection
        this.selectCountry = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.countryDropdownCount = page.locator(".ta-results button");
        this.emailField = page.locator(".user__name label").first();
        this.submitButton = page.locator(".action__submit");
    }

    async enterCardDetails(cvvNumber: string, nameOnCard: string) {
        await this.cvvNumber.type(cvvNumber);
        await this.nameOnCard.type(nameOnCard);
    }

    async verifyTheProductIsDisplayed(productName: string) {
        const bool3: any = await this.productNameInCheckout.textContent();
        const bool4 = bool3.trim();
        console.log(bool4 + "..bool4....");
        expect(bool4).toBe(productName);
    }

    async applyCouponAndVerify(couponCode: string) {
        await this.applyCouponTextField.waitFor();
        await this.applyCouponTextField.type(couponCode);
        await this.applyCouponButton.click();
        await this.couponSuccessMessage.waitFor();
        const bool1 = await this.couponSuccessMessage.isVisible();
        expect(bool1).toBeTruthy();
    }

    async selectCountryFromDropdown(countryCode: string, countryName: string) {
        await this.selectCountry.waitFor();
        await this.selectCountry.pressSequentially(countryCode, { delay: 100 });
        await this.page.locator(".ta-results").waitFor();
        const dropdownCount = await this.page.locator(".ta-results button").count();
        console.log(dropdownCount);

        let text: any;
        for (let i = 0; i < dropdownCount; ++i) {
            text = await this.page.locator(".ta-results").locator('button').nth(i).textContent();
            console.log(text);

            if (text === countryName) {
                await this.page.locator(".ta-results").locator('button').nth(i).click();
                console.log("Country selected is: " + text);
                break;
            }
        }


    }

    async verifyEmailField(email: string) {
        await expect(this.emailField).toHaveText(email);
    }

    async clickOnSubmitButton() {
        await this.submitButton.click();
    }
}
module.exports = { CheckoutPage };
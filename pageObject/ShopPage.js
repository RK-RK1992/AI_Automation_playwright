const { expect } = require('@playwright/test');

class ShopPage {
    constructor(page) {
        this.iphoneXProduct = page.getByRole('link', { name: /^iphone x$/i });
    }

    async verifyProductIsDisplayed() {
        await expect(this.iphoneXProduct).toBeVisible();
    }
}

module.exports = { ShopPage };

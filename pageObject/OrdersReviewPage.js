class OrdersReviewPage {
    constructor(page) {
        this.page = page;
        this.productName = page.locator(".title").first();
        this.thankYouMessage = page.locator(".hero-primary");
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
    }
    async verifyTheProductIsDisplayed(productName) {
        const bool3 = await this.productName.textContent();
        const bool4 = bool3.trim();
        console.log(bool4 + "..bool4....");
        await expect(bool4).toBe(productName);
    }
    async verifyThankYouMessage(thankYouMessage) {
        await this.page.locator(".title").first().waitFor();
        await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    }
    async getOrderID() {
        await this.page.locator(".title").first().waitFor();
        const orderID = await this.orderID.textContent();
        return orderID;
    }
}

module.exports = { OrdersReviewPage };
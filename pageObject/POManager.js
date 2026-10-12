const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { PracticeLoginPage } = require('./PracticeLoginPage');
const { ShopPage } = require('./ShopPage');
class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.practiceLoginPage = new PracticeLoginPage(this.page);
        this.shopPage = new ShopPage(this.page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
    getCheckoutPage() {
        return this.checkoutPage;
    }

    getPracticeLoginPage() {
        return this.practiceLoginPage;
    }

    getShopPage() {
        return this.shopPage;
    }
}
module.exports = { POManager };
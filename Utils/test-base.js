const base = require('@playwright/test');



exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            userName: "rohitkush38@gmail.com",
            passWord: "Password@1",
            productName: "ZARA COAT 3",

        }

    })
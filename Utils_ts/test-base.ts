import { test as baseTest } from '@playwright/test';


interface TestDataForOrder {
    userName: string;
    passWord: string;
    productName: string;
}
export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>(
    {
        testDataForOrder: {
            userName: "rohitkush38@gmail.com",
            passWord: "Password@1",
            productName: "ZARA COAT 3",

        }

    })
const { test,expect } = require('@playwright/test');
 
 
test('@QW Security test request intercept', async ({ page }) => {
 
    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("mike.testman@mailinator.com");
    await page.locator("#userPassword").fill("Team123!");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    //move to cart or my orders
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    //move to order id created for another user
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();

    //check that appeared error message for network security test 
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})
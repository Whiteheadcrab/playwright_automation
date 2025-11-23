const { test, firefox, expect } = require('@playwright/test');
 
 
 
 

test('Playwright Special locators', async ({ page }) => {
  
    //move to page
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //using locator - Label
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    //using locator - Placeholder
    await page.getByPlaceholder("Password").fill("abc123");
    //using locator - Role , with additional verification that it is button or link
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
    //locator(css)
 
 });
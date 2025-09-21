//import playwright annotation
const {test} = require('@playwright/test');

//Test case creation 
//added async for await functional
// function() was replaced with ()=>
// no require to declare "browser" , it is flobal value in playwright
test('First Playwright test' , async ({browser})=>
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();
    //open new change
    const page = await context.newPage;
    await page.goto("https://rahulshettyacademy.com/client");

});
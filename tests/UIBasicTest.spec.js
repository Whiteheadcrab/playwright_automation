//import playwright annotation
const {test, firefox} = require('@playwright/test');

//Test case creation 
//added async for await functional
// function() was replaced with ()=>
// no require to declare "browser" , it is flobal value in playwright

//left as example of all set ups
test('Browser Context Playwright test' , async ({browser})=>
    {
        //open new page
        const page = await browser.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
    });
    

test('Page Playwright test' , async ({page})=>
{
    await page.goto("https://google.com");
});
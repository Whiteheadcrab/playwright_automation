//import playwright annotation
const {test, firefox, expect} = require('@playwright/test');

//Test case creation 
//added async for await functional
// function() was replaced with ()=>
// no require to declare "browser" , it is flobal value in playwright

//left as example of all set ups
test('Browser Context Playwright test' , async ({browser})=>
    {
        //open new page
        const page = await browser.newPage();
        await page.goto("https://rahulshettyacademy.com/client/auth/login");

        //get title - assertion 
        console.log(await page.title());
    });
    

test('Page Playwright test' , async ({page})=>
{
    await page.goto("https://google.com");

    //get title - assertion 
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('@Web Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    //Data for login
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");

    //Open login webpage
    await page.goto("https://rahulshettyacademy.com/client/auth/login");

    //Input login data
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Iamking@000");

    //Click login
    await page.locator("[value='Login']").click();

    //After store page will load , check all appeared items in store 
    //This command waits until there are no ongoing network requests for at least 500 ms (Playwright’s default “idle” period).
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    //Create array of elements <b> inside elements with the class .card-body.
    const titles = await page.locator(".card-body b").allTextContents();
    //Print out array 
    console.log(titles); 

 })
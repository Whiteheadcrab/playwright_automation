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

 test('UI control' , async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName = page.locator("#username");
        const signIn = page.locator("#signInBtn");
        const documentLink = page.locator("[href*='documents-request']");
        // find drop down item 
        const dropdown = page.locator("select.form-control");
        // select variant in drop down menu
        await dropdown.selectOption("consult");
        // select second radio text option
        await page.locator(".radiotextsty").last().click();
        // press confirmation button
        await page.locator("#okayBtn").click();
        // check selecting of buttons/radiobuttons 
        console.log(await page.locator(".radiotextsty").last().isChecked());
        await expect(page.locator(".radiotextsty").last()).toBeChecked();

        //Select optino to aknowledge data collection 
        await page.locator("#terms").click();
        //check that it is checked , yes I know how it sound
        await expect(page.locator("#terms")).toBeChecked();
        //Then uncheck it and verify status of it 
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();
        //Verify appearing text with class - blinkingText
        await expect(documentLink).toHaveAttribute("class","blinkingText");
    });


 test('@Child windows hadl', async ({browser})=>
    {
        //Create variable for content and page base on browser
       const context = await browser.newContext();
       const page =  await context.newPage();
       //Create object for finding user name field
       const userName = page.locator('#username');
       //Move to page 
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       //Create object for appearing document request
       const documentLink = page.locator("[href*='documents-request']");
    
       //Used when an action (like a click) triggers an event (like a new page opening) — and you want to wait for both in a race-free way.
       const [newPage]=await Promise.all(
      [
         context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
         documentLink.click(),
      
      ])//new page is opened
      
       // Get text from the element
       const text = await newPage.locator(".red").textContent();
       //Element with @ will be splited into 2 elements
       const arrayText = text.split("@");
       // Extract the domain part (second element)
       const domain =  arrayText[1].split(" ")[0];
       //console.log(domain);
       await page.locator("#username").fill(domain);
       console.log(await userName.inputValue());
    
    })
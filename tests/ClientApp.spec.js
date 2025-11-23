const { test, firefox, expect } = require('@playwright/test');
 
 
 
 
test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   //Create variable for login
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");

   //login process
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();

   //require to wait for loading card items , without it will be only 0 as result of next searches
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 

   // count number of appeared element in shop 
   const count = await products.count();

   //add all counted elements into a cart
   //.nth(i) is finding I-nth element , example : .nth(4) - will find 4th element
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   //check cart 
   await page.locator("[routerlink*='cart']").click();
   // check additional pause , if require , could be uncommented 
   // await page.pause();
 
   //check that selected item in cart
   await page.locator("div li").first().waitFor();
   //check that element , which contain text ZARA COAT 3 , is visible 
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();

   //go to Checkout
   await page.locator("text=Checkout").click();

   //input shipment data - country
   //used pressSequentially for slowly tiping it(instead of fill) , for opening dropdown menu with countries 
   await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   //check used user with our mail
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   //finish order
   await page.locator(".action__submit").click();
   //finish order and checking existing of order
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   //Open my order page 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   //search and select my created order
   const rows = await page.locator("tbody tr");
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   //check that order has id , as additional confimration that order exist 
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});

test('@Webst Client App login v - locators', async ({ page }) => {
   //version of Webst Client App login , but used locators 
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   //login
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button',{name:"Login"}).click();
   //wait for end of network request and load home page
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   //add item to cart , used filer to found ites with test - ZARA COAT 3
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
   //open cart
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   //finish order
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button",{name :"Checkout"}).click();
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   //check that new order was created 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})
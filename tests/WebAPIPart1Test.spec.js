const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils');
const loginPayLoad = { userEmail: "mike.testman@mailinator.com", userPassword: "Team123!" };
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"68a961459320a140fe1ca57a"}]};
 
//set up before triggering tests 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiutils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiutils.createOrder(orderPayLoad);
 
})
 
 
//send data to get token
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );

//move to order page
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");

for(let i = 0; i<await rows.count(); i++)
{
   const rowOrderId = await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails = await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
// Precondition - create order -
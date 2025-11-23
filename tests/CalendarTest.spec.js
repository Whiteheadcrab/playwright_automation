const { test, firefox, expect } = require('@playwright/test');
 
 
 
 
test("Calendar validations",async({page})=>
    {
        //initialise variable for calendar's data
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber,date,year];
        
        //go to page 
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        //open calendar 
        await page.locator(".react-date-picker__inputGroup").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.locator(".react-calendar__navigation__label").click();
        //input year
        await page.getByText(year).click();
        //input month
        await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
        //input date 
        await page.locator("//abbr[text()='"+date+"']").click();
     
        const inputs =  page.locator('.react-date-picker__inputGroup__input')
     
        for(let i =0; i<expectedList.length;i++)
        {
            const value = await inputs.nth(i).inputValue();
            expect(value).toEqual(expectedList[i]);
     
        }
    })
import { test,firefox, expect } from '@playwright/test';

test.only('test', async ({ page }) => {
  //Got to page www.checklyhq.com/
  await page.goto('https://www.checklyhq.com/');
  //Check present of objects and values of these objects in this page
  await expect(page.getByText('Detect. Communicate. Resolve.')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Detect. Communicate. Resolve.And get back to shipping.');
  await expect(page.getByText('Checkly unifies testing,')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Checkly unifies testing, monitoring, & observability with an AI-native workflow.Application reliability for modern engineering.');

  //Move to "Product" category
  await page.getByRole('button', { name: 'Product' }).first().click();
  //Move to "Status Pages Communicate app" sub category
  await page.getByRole('link', { name: 'Status Pages Communicate app' }).click();
  //Check present of objects and values of these objects in this page
  await expect(page.getByRole('heading', { name: 'The fastest way to' })).toBeVisible();
  await expect(page.locator('h1')).toContainText('The fastest way to communicate application availability');
  await expect(page.getByText('With Status Pages, you can')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('With Status Pages, you can communicate outages, share real-time availability, and reduce support load—all without switching tools or duplicating work.');

  //Move to "Resources" category
  await page.getByRole('button', { name: 'Resources' }).first().click();
  //Move to "Documentation" sub category
  await page.getByRole('link', { name: 'Documentation', exact: true }).click();
  //Check present of objects and values of these objects in this page
  await expect(page.getByRole('heading', { name: 'Checkly Documentation' })).toBeVisible();
  await expect(page.locator('#page-title')).toContainText('Checkly Documentation');
});
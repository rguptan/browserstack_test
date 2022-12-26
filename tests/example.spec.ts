import { test } from '../fixtures';
import { expect } from '@playwright/test';
import { chromium } from 'playwright';

test.describe('Oscar Health', () => {
  test('Find a doctor', async ({ page }) => {

    console.log("Page in test file => " + page);
    //const page = await vBrowser.newPage();
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });
    const findADoctor = nav.getByRole('link', { name: 'Find a Doctor' });
    await findADoctor.click();

  });
});

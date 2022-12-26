// playwright.config.js
// @ts-check
import { devices, PlaywrightTestConfig } from '@playwright/test';

/** @type {import('@playwright/test').PlaywrightTestConfig} */

const config: PlaywrightTestConfig = {
  /* globalSetup:require.resolve('./global-setup'),
  globalTeardown:require.resolve('./global-teardown'), */
  testDir: 'tests',
  testMatch: '**/*.spec.ts',
  timeout: 60000,
  use: {
    viewport: null,
    trace: 'on',
    baseURL: 'https://www.hioscar.com/',
  },
  projects: [
    // -- BrowserStack Projects --
    // name should be of the format browser@browser_version:os os_version@browserstack
    {
      name: 'chrome@latest-beta:OSX Big Sur@browserstack',
      use: {
        browserName: 'chromium',
        channel: 'chrome'
      },
    }
  ],
};
export default config;

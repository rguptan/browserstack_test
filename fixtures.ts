// fixtures.js
import { test as base } from '@playwright/test';
import * as cp from 'child_process';

//const base = require('@playwright/test');
//const cp = require('child_process');
const clientPlaywrightVersion = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ')[1];
import * as BrowserStackLocal from 'browserstack-local';

// BrowserStack Specific Capabilities.
const caps = {
  browser: 'chrome',
  os: 'osx',
  os_version: 'catalina',
  name: 'playwright-typescript',
  build: 'playwright-typescript-build-1',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'rajeshguptan_K6s7zp',
  'browserstack.accessKey':
    process.env.BROWSERSTACK_ACCESS_KEY || 'dCKSXTsCebftfAghhJCi',
  'browserstack.local': process.env.BROWSERSTACK_LOCAL || false,
  'browser_version': 'latest',
  'clientPlaywrightVersion': '1.23'
};

export const bsLocal = new BrowserStackLocal.Local();

// replace mZgpti9vW65cJPhmVPWZ with your key. You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
export const BS_LOCAL_ARGS = {
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'ADZqq5cND8dihy2RJAZD',
};

// Patching the capabilities dynamically according to the project name.
const patchCaps = (name, title) => {
  let combination = name.split(/@browserstack/)[0];
  let [browerCaps, osCaps] = combination.split(/:/);
  let [browser, browser_version] = browerCaps.split(/@/);
  let osCapsSplit = osCaps.split(/ /);
  let os = osCapsSplit.shift();
  let os_version = osCapsSplit.join(' ');
  caps.browser = browser ? browser : 'chrome';
  caps.browser_version = browser_version ? browser_version : 'latest';
  caps.os = os ? os : 'osx';
  caps.os_version = os_version ? os_version : 'catalina';
  caps.name = title;
};

const isHash = (entity) => Boolean(entity && typeof (entity) === "object" && !Array.isArray(entity));
const nestedKeyValue = (hash, keys) => keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);
const isUndefined = val => (val === undefined || val === null || val === '');
const evaluateSessionStatus = (status) => {
  if (!isUndefined(status)) {
    status = status.toLowerCase();
  }
  if (status === "passed") {
    return "passed";
  } else if (status === "failed" || status === "timedout") {
    return "failed";
  } else {
    return "";
  }
}

export const test = base.extend({
  page: async ({ page, playwright }, use, testInfo) => {    // Use BrowserStack Launched Browser according to capabilities for cross-browser testing.
    if (testInfo.project.name.match(/browserstack/)) {
      patchCaps(testInfo.project.name, `${testInfo.file} - ${testInfo.title}`);
      const vBrowser = await playwright.chromium.connect({
        wsEndpoint:
          `wss://cdp.browserstack.com/playwright?caps=` +
          `${encodeURIComponent(JSON.stringify(caps))}`,
      });

      // console.log("Browser => " + vBrowser.browserType);
      // console.log("caps => " + JSON.stringify(caps));

      const vContext = await vBrowser.newContext(testInfo.project.use);
      const vPage = await vContext.newPage();
      // console.log("Page => " + vPage);
      await use(vPage);
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          status: evaluateSessionStatus(testInfo.status),
          reason: nestedKeyValue(testInfo, ['error', 'message'])
        },
      };
      await vPage.evaluate(() => { },
        `browserstack_executor: ${JSON.stringify(testResult)}`);
      await vPage.close();
      await vBrowser.close();
    } else {
      use(page);
    }
  },
});

export { expect } from '@playwright/test';



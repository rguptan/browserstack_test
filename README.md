## Pre-requisites

You need BrowserStack credentials to be able to run Playwright tests. You have to replace `YOUR_USERNAME` and `YOUR_ACCESS_KEY` in the sample scripts in this repository with your BrowserStack credentials which can be found in your [Account Settings](https://www.browserstack.com/accounts/settings) page.

**Alternatively, you can set the environment variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` with your credentials and all the scripts in this repository should work fine**

## Run your first Playwright test on BrowserStack

1. Clone this repository
2. Install the dependencies using `npm install`
3. Run the sample script using `npx playwright test example.spec.ts --config=./playwright-single-device.config.ts`

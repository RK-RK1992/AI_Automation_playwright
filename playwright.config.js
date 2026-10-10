// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const Config = defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  retries: 1,
  workers: 6,////////**/ */
  expect: {
    timeout: 5000,
  },
  reporter: 'html',


  use: {

    browserName: 'chromium',
    headless: false,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: 'on', //off, on, or only-on-failure
    trace: 'on',  //off on, on, retain-on-failure, or only-on-failure
    // viewport: { width: 780, height: 720 },
    //video: 'retain-on-failure', //off, on, or retain-on-failure

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  },
}
);

module.exports = Config;
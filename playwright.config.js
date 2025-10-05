// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  /*40 sec timeout*/
  timeout: 40 *1000,
  /*40 sec timeout for expect items*/
  expect: {
    timeout: 40 *1000,
  },
  /*Add reporter*/
  reporter : 'html',

  /* Run tests in files in parallel */
    use: {
      /*Use firefox as browser*/
      browserName: 'firefox'

  },
});

module.exports = config


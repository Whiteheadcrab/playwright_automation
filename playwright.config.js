// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  /*50 sec timeout*/
  timeout: 50 *1000,
  /*50 sec timeout for expect items*/
  expect: {
    timeout: 50 *1000,
  },
  /*Add reporter*/
  reporter : 'html',

  /* Run tests in files in parallel */
    use: {
      /*Use firefox as browser*/
      browserName: 'firefox',
      /*Not opening browser during testing*/
      headless : true,
      /*Allow to create screenshout on each automatic steps*/
      screenshot : 'on',
      /*Anable trace log recording*/
      trace : 'on'
  },
});

/*Using created config*/
module.exports = config


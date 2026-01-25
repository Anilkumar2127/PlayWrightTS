import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";
dotenv.config();
const timeOut:number=60*1000;

export default defineConfig({
  testDir: '../tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.RETRIES?Number.parseInt(process.env.RETRIES):undefined,
  workers:process.env.PARALLELMODE?Number.parseInt(process.env.PARALLELMODE):undefined,
  timeout:process.env.TESTTIMEOUT?Number.parseInt(process.env.TESTTIMEOUT) * timeOut:undefined,
  reporter: [['html',{outputDir:"./playwright-report"}], ['../utilities/Listeners/TestListener.ts']],
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: process.env.HEADLESS?.toLocaleLowerCase()==="true",
    screenshot:'only-on-failure',
    actionTimeout:process.env.ACTIONTIMEOUT?Number.parseInt(process.env.ACTIONTIMEOUT) * timeOut:undefined,
    navigationTimeout:process.env.NAVIGATIONTIMEOUT?Number.parseInt(process.env.NAVIGATIONTIMEOUT) * timeOut:undefined,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

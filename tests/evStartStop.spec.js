const { test, expect } = require("@playwright/test");
const { existsSync } = require("node:fs");
const { EvincedSDK } = require("@evinced/js-playwright-sdk");

let evincedService;

test.beforeEach(async ({ page }) => {
  evincedService = new EvincedSDK(page);
  await evincedService.evStart();
});

test.describe("Evinced Demo Page", () => {
  test("Continuous Test", async ({ page }) => { 
    await page.goto("https://demo.evinced.com/");

    const BASE_FORM_SELECTOR =
      "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container";
    const SELECT_HOME_DROPDOWN = `${BASE_FORM_SELECTOR} > div:nth-child(1) > div > div.dropdown.line`;
    const SELECT_WHERE_DROPDOWN = `${BASE_FORM_SELECTOR} > div:nth-child(2) > div > div.dropdown.line`;
    const TINY_HOME_OPTION = `${BASE_FORM_SELECTOR} > div:nth-child(1) > div > ul > li:nth-child(2)`;
    const EAST_COST_OPTION = `${BASE_FORM_SELECTOR} > div:nth-child(2) > div > ul > li:nth-child(3)`;

    await page.locator(SELECT_HOME_DROPDOWN).click();
    await page.locator(TINY_HOME_OPTION).click();
    await page.locator(SELECT_WHERE_DROPDOWN).click();
    await page.locator(EAST_COST_OPTION).click();
  });
});

test.afterEach(async () => {
  const issues = await evincedService.evStop();
  const evReport = "./test-results/startStop.html";
  await evincedService.evSaveFile(issues, "html", evReport);
  expect(existsSync(evReport)).toBeTruthy();
});

// Use require in CommonJS module (default)
const { test, expect } = require("@playwright/test");
const { existsSync } = require("node:fs");
const { EvincedSDK } = require("@evinced/js-playwright-sdk");

// Test is the same with either module system
test.describe("Evinced Demo Page", () => {
  test("evAnalyze Run Test", async ({ page }) => {
    const evReport = "./test-results/test.html";
    const evincedService = new EvincedSDK(page);
    await page.goto("https://www.natwest.com/credit-cards/purchase-and-balance-transfer.html");
    const issues = await evincedService.evAnalyze();
    console.log("Issues =", issues);
    await evincedService.evSaveFile(issues, "html", evReport);
    expect(existsSync(evReport)).toBeTruthy();
  });
});

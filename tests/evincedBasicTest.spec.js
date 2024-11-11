const { test, expect } = require("@playwright/test");
const { existsSync } = require("node:fs");
const { EvincedSDK } = require("@evinced/js-playwright-sdk");

// Use import in ECMAScript module
// (.mjs extension or type: module in package.json)
// import { test, expect } from "@playwright/test";
// import { existsSync } from "node:fs";
// import evExport from "@evinced/js-playwright-sdk";
// const { EvincedSDK } = evExport;

// Test is the same with either module system
test.describe("Evinced Demo Page", () => {
  test("Single Run Test", async ({ page }) => {
    const evReport = "./test-results/single.html";
    const evincedService = new EvincedSDK(page);
    await page.goto("https://demo.evinced.com/");
    const issues = await evincedService.evAnalyze();
    await evincedService.evSaveFile(issues, "html", evReport);
    expect(existsSync(evReport)).toBeTruthy();
  });
});

import { EvincedSDK } from "@evinced/js-playwright-sdk";

export class EvincedDriver {
    constructor(page) {
        // Initialise with the Playwright page
        this.evincedService = new EvincedSDK(page);
    }
}
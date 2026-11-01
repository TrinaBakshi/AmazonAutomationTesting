import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "@playwright/test";
import { pageFixture } from "./pageFixture"

let browser: Browser;
let page: Page;

Before(async function () {
    browser = await chromium.launch({headless: false, channel: "chrome"});
    page = await browser.newPage();
    pageFixture.page = page;
})

After(async function() {
    await pageFixture.page.close();
})

AfterAll(async function () {
    await browser.close();
})

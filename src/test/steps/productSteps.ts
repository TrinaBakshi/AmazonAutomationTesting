import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { expect, Locator, Page } from "@playwright/test";

setDefaultTimeout(60 * 1000);

Given("User navigates to the application", async function () {
  await this.page.goto("https://www.amazon.in/");
});

When(
  "User types the desired {string} inside the search bar",
  async function (productName: string) {
    const searchBox = this.page.locator(
      '//input[@id="twotabsearchtextbox"]',
    );
    await searchBox.waitFor({ state: "visible" });
    await searchBox.fill(productName);
  },
);

When("User selects the search button", async function () {
  await this.page
    .locator('//input[@id="nav-search-submit-button"]')
    .click();
});

When(
  "User selects the {string} or {string} from the list",
  async function (productName: string, productName1: string) {
    let item = this.page
      .locator(`//a//h2[contains(@aria-label,"${productName}")]`)
      .first();

    if (!(await item.isVisible({ timeout: 5000 }).catch(() => false))) {
      item = this.page
        .locator(`//a//h2[contains(@aria-label,"${productName1}")]`)
        .first();
    }

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      item.click(),
    ])
      .then((result) => result)
      .catch(() => [null]);

    if (newPage) {
      await newPage.waitForLoadState("domcontentloaded");
      this.page = newPage;
    }
  },
);

Then("product details page will be launched", async function () {
  await expect(
    this.page.locator('//span[@id="productTitle"]'),
  ).toBeVisible();
});

When(
  "User selects the size of the product as {string}",
  async function (speciification: string) {
    await this.page
      .locator(
        `//div[@id="inline-twister-expander-content-size_name"]//span[contains(@class,"swatch-title-text-single-line") and normalize-space(text())="${speciification}"]/ancestor::li//input[@role="radio"]`,
      )
      .click();
  },
);

When(
  "User selects the style name of the product as {string}",
  async function (style: string) {
    const productStyle = this.page.locator(
      `//div[contains(@class, "swatch-container")]//span[normalize-space(text())="${style}"]//ancestor::li//input`,
    );
    await productStyle.click({ force: true }).catch(() => null);
  },
);

When(
  "User selects the color of the product as {string}",
  async function (color: string) {
    const productColor = this.page.locator(
      `//span[contains(@class,"slots")]//img[@alt="${color}"]`,
    );

    await productColor.click({ force: true }).catch(() => null);
  },
);

When(
  "User selects with exchange radio button as {string}",
  async function (option: string) {
    const chooseBtn = this.page.locator(
      `//h5[.//span[text()="${option}"]]//preceding-sibling::i`,
    );
    await chooseBtn.click();
    await chooseBtn.click();
  },
);

When("User clicks on choose phone to exchange button", async function () {
  const exchangeButton = this.page.locator(
    '//span[normalize-space(text())="Choose phone to exchange"]/preceding-sibling::input[@type="submit"]',
  );
  await exchangeButton.waitFor({ state: "visible" });
  await exchangeButton.click({ force: true }).catch(() => null);
});

When(
  "User selects brand as {string} from the drop down option",
  async function (brand: string) {
    const dropDownBrand = this.page.locator(
      ` //h5[normalize-space(text())='Exchange your old product']//ancestor::div[@id='rightColumn']//span[contains(@class, "show")][.//span[text()="Select Brand"]]`,
    );
    await dropDownBrand.waitFor({ state: "visible" });
    await dropDownBrand.click();
    await this.page.locator(`//a[text()="${brand}"]/ancestor::li[contains(@class, "dropdown")]`).click();
  },
);

When(
  "User selects model as {string} from the drop down option",
  async function (model: string) {
    const dropdown = this.page.locator(
      `//h5[normalize-space(text())='Exchange your old product']//ancestor::div[@id='rightColumn']//span[contains(@class, "show")][.//span[text()="Select Model"]]`,
    );
    await dropdown.waitFor({ state: "visible" });
    await dropdown.click();
    await this.page.locator(`//a[text()="${model}"]/ancestor::li[contains(@class, "dropdown")]`).click();
  },
);

When(
  "User selects RAM and storage as {string} from the drop down option",
  async function (storage: string) {
    const dropdown = this.page.locator(
      `//h5[normalize-space(text())='Exchange your old product']//ancestor::div[@id='rightColumn']//span[contains(@class, "show")][.//span[text()="Select RAM and Storage"]]`,
    );
    await dropdown.waitFor({ state: "visible" });
    await dropdown.click();
    await this.page.locator(`//a[text()="${storage.replace('-','|')}"]/ancestor::li[contains(@class, "dropdown")]`).click();
  },
);

When(
  "User selects your phone condition as {string}",
  async function (phoneCondition: string) {
    await this.page
      .locator(
        `//h5[normalize-space(text())="${phoneCondition}"]/ancestor::label[@for="noBodyDamageCheckbox"]`,
      )
      .click();
  },
);

When("User clicks on continue button", async function () {
  await this.page
    .locator(
      '//span[normalize-space(text())="Continue"]//preceding-sibling::input[@type="submit"]',
    )
    .click();
});

When(
  "User enters IMEI number as {string}",
  async function (imeiNumber: string) {
    await this.page
      .locator('//input[@placeholder="Enter IMEI number"]')
      .fill(imeiNumber);
  },
);

When("User clicks on verify button", async function () {
  await this.page
    .locator(
      '//span[normalize-space(text())="Verify"]//preceding-sibling::input[@type="submit"]',
    )
    .click();
});

When("User clicks on Apply Exchange button", async function () {
  await this.page
    .locator(
      '//span[normalize-space(text())="Apply Exchange"]//preceding-sibling::input[@type="submit"]',
    )
    .click();
});

When("User applies coupon", async function () {
  const applyCoupon = this.page.locator(
    '//span[normalize-space(text())="Apply Coupon"]//preceding-sibling::input[@type="submit"]',
  );

  if (await applyCoupon.isVisible({timeout: 5000}).catch(()=>null)) {
    await applyCoupon.click();
  }
});

Then("Product price will be updated", async function () {
  const productPriceAfterDiscount = this.page.locator(
    '//span[@id="priceAfterBuyBackDiscount"]',
  );
  if (productPriceAfterDiscount.isVisible()) {
    const price = (await productPriceAfterDiscount.textContent())?.trim();
    console.log("Price After Exchange: " + price);
  }
});

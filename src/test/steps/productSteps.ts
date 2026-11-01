import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../hooks/pageFixture";
import { expect } from "@playwright/test";

Given("User navigates to the application", async function () {
  await pageFixture.page.goto("https://www.amazon.in/");
});

When(
  "User types the desired {string} inside the search bar",
  async function (productName: string) {
    const searchBox = pageFixture.page.locator(
      '//input[@id="twotabsearchtextbox"]',
    );
    await searchBox.waitFor({ state: "visible" });
    await searchBox.fill(productName);
  },
);

When("User selects the search button", async function () {
  await pageFixture.page
    .locator('//input[@id="nav-search-submit-button"]')
    .click();
});

When(
  "User selects the {string} from the list",
  async function (productName: string) {
    const item = pageFixture.page
      .getByRole("listitem")
      .filter({ hasText: productName })
      .first();
    await item.waitFor({ state: "visible" });
    await item.click();
  },
);

Then("product details page will be launched", async function () {
  await expect(
    pageFixture.page.locator('//span[@id="productTitle"]'),
  ).toBeVisible();
});

When(
  "User selects the size of the product as {string}",
  async function (speciification: string) {
    const productSize = pageFixture.page
      .locator(
        '//div[@id="inline-twister-expander-content-size_name"]//span[contains(@class, "swatch-title-text-single-line")]',
      )
      .getByText(speciification);
    await productSize.click();
  },
);

When(
  "User selects the style name of the product as {string}",
  async function (style: string) {
    const productStyle = pageFixture.page
      .locator(
        '//div[@id="inline-twister-expander-content-style_name"]//span[contains(@class, "swatch-title-text-display")]',
      )
      .getByText(style);
    await productStyle.click();
  },
);

When(
  "User selects the color of the product as {string}",
  async function (color: string) {
    const productColor = pageFixture.page
      .locator(
        `//div[@id="inline-twister-expander-content-color_name"]//img[@alt="${color}"]`,
      )
      .first();

    await productColor.click();
  },
);

When(
  "User selects with exchange radio button as {string}",
  async (option: string) => {
    const exchangeOption = pageFixture.page.locator(
      `//span[text()="${option}"]//ancestor::div[@role="button"]/i[contains(@class, "radio")]`,
    );
    await exchangeOption.click();
  },
);

When("User clicks on choose phone to exchange button", async function () {
  await pageFixture.page
    .locator('//span[normalize-space(text())="Choose phone to exchange"]')
    .click();
});

When(
  "User selects brand as {string} from the drop down option",
  async function (brand: string) {
    const dropDownBrand = pageFixture.page.locator(
      ` //h5[normalize-space(text())='Exchange your old product']//ancestor::div[@id='rightColumn']//span[contains(@class, "show")][.//span[text()="Select Brand"]]`,
    );
    await dropDownBrand.click();
    await pageFixture.page.selectOption(dropDownBrand, { value: brand });
  },
);

When(
  "User selects model as {string} from the drop down option",
  async function (model: string) {
    const dropdown = pageFixture.page.locator(
      `//h5[normalize-space(text())='Exchange your old product']//ancestor::div[@id='rightColumn']//span[contains(@class, "show")][.//span[text()="Select Model"]]`,
    );
    await dropdown.click();
    await pageFixture.page.selectOption(dropdown, { value: model });
  },
);

When(
  "User selects RAM and storage as {string} from the drop down option",
  async function (storage: string) {
    const dropdown = pageFixture.page.locator(
      `//h5[normalize-space(text())='Exchange your old product']//ancestor::div[@id='rightColumn']//span[@data-a-class='show']//span[text()='Select RAM and Storage']`,
    );
    await dropdown.click();
    await pageFixture.page.selectOption(dropdown, { value: storage });
  },
);

When(
  "User selects your phone condition as {string}",
  async function (phoneCondition: string) {
    await pageFixture.page
      .locator(
        `//h5[normalize-space(text())="${phoneCondition}"]/ancestor::label[@for="noBodyDamageCheckbox"]`,
      )
      .click();
  },
);

When("User clicks on continue button", async function () {
  await pageFixture.page
    .locator(
      '//span[normalize-space(text())="Continue"]//preceding-sibling::input[@type="submit"]',
    )
    .click();
});

When(
  "User enters IMEI number as {string}",
  async function (imeiNumber: string) {
    await pageFixture.page
      .locator('//input[@placeholder="Enter IMEI number"]')
      .fill(imeiNumber);
  },
);

When("User clicks on verify button", async function () {
  await pageFixture.page
    .locator(
      '//span[normalize-space(text())="Verify"]//preceding-sibling::input[@type="submit"]',
    )
    .click();
});

When("User clicks on Apply Exchange button", async function () {
  await pageFixture.page
    .locator(
      '//span[normalize-space(text())="Apply Exchange"]//preceding-sibling::input[@type="submit"]',
    )
    .click();
});

When("User applies coupon", async function () {
  const applyCoupon= pageFixture.page
    .locator(
      '//span[normalize-space(text())="Apply Coupon"]//preceding-sibling::input[@type="submit"]',
    );

    if(applyCoupon.isVisible()){
      await applyCoupon.click();
    }

});

Then("Product price will be updated", async function () {
  const productPriceAfterDiscount = pageFixture.page.locator('//span[@id="priceAfterBuyBackDiscount"]');
  if(productPriceAfterDiscount.isVisible()){
    const price = (await productPriceAfterDiscount.textContent())?.trim();
    console.log("Price After Exchange: "+ price);
  }
});

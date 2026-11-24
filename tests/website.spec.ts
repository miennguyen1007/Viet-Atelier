import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";

test("home page switches language and clearly identifies the enquiry demo", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
  await expect(homePage.heroHeading).toContainText("For the days");
  await expect(page.getByRole("img", { name: "VIET ATELIER" }).first()).toBeVisible();
  await expect(homePage.heroHeading).toContainText("you long to come home");

  await homePage.switchToVietnamese();
  await expect(homePage.heroHeading).toContainText("Cho những ngày");

  await homePage.requestQuotation("Demo Visitor", "visitor@example.com", "Looking for lighting for a hotel.");
  await homePage.expectDemoNotSentNotice();
});

test("product listing filters by category and search", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.open();
  await productsPage.expectProductCount(10);

  await productsPage.chooseCategory("Decorative lighting");
  await productsPage.expectProductCount(5);

  await productsPage.search("Woven Pendant");
  await productsPage.expectProductCount(2);
});

test("product detail shows a quotation action and product context", async ({ page }) => {
  await page.goto("/products/woven-pendant-01");
  await expect(page.getByRole("heading", { name: "Woven Pendant 01" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Request a quotation/ })).toHaveAttribute("href", /product=woven-pendant-01#contact/);
});

test("quotation entry keeps the selected product context", async ({ page }) => {
  await page.goto("/?product=woven-pendant-01#contact");
  await expect(page.locator(".selected-product")).toContainText("Woven Pendant 01");
  await expect(page.locator('input[name="product"]')).toHaveValue("woven-pendant-01");
});

test("mobile navigation opens and the product page fits the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const homePage = new HomePage(page);
  await homePage.open();
  await homePage.openMobileMenu();
  await page.getByRole("link", { name: "Products", exact: true }).click();
  await expect(page).toHaveURL(/\/products$/);
  const documentWidth = await page.locator("body").evaluate((body) => body.scrollWidth);
  expect(documentWidth).toBeLessThanOrEqual(390);
});

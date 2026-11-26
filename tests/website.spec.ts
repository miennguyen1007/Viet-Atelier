import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";

test("quotation form sends the request to the email API and confirms success", async ({ page }) => {
  let submittedPayload: Record<string, string> | undefined;
  await page.route("**/api/quotation", async (route) => {
    submittedPayload = route.request().postDataJSON() as Record<string, string>;
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });

  const homePage = new HomePage(page);
  await homePage.open();
  await expect(homePage.heroHeading).toContainText("For the days");
  await expect(page.getByRole("img", { name: "VIET ATELIER" }).first()).toBeVisible();
  await expect(homePage.heroHeading).toContainText("you long to come home");

  await homePage.requestQuotation("Demo Visitor", "visitor@example.com", "Looking for lighting for a hotel.");
  await homePage.expectRequestSentNotice();
  expect(submittedPayload).toEqual({
    name: "Demo Visitor",
    email: "visitor@example.com",
    message: "Looking for lighting for a hotel.",
  });
});

test("quotation API rejects incomplete details", async ({ page }) => {
  const response = await page.request.post("/api/quotation", { data: {} });
  expect(response.status()).toBe(400);
});

test("contact section provides the tappable phone number", async ({ page }) => {
  await page.goto("/#contact");
  const phoneLink = page.getByRole("link", { name: "0901.462.897" });
  await expect(phoneLink).toHaveAttribute("href", "tel:+84901462897");
});

test("quotation email field is visibly required and validates email format", async ({ page }) => {
  await page.goto("/");
  const emailInput = page.locator('input[name="email"]');

  await expect(page.getByText("Work email", { exact: false })).toBeVisible();
  await expect(emailInput).toHaveAttribute("required", "");
  await expect(emailInput).toHaveAttribute("type", "email");
  expect(await emailInput.evaluate((input) => (input as HTMLInputElement).validity.valueMissing)).toBe(true);
  await emailInput.fill("not-an-email");
  expect(await emailInput.evaluate((input) => (input as HTMLInputElement).validity.typeMismatch)).toBe(true);
});

test("quotation form reports a delivery failure without claiming it was sent", async ({ page }) => {
  await page.route("**/api/quotation", (route) =>
    route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ error: "Email delivery is not configured" }) }),
  );

  const homePage = new HomePage(page);
  await homePage.open();
  await homePage.requestQuotation("Demo Visitor", "visitor@example.com", "Looking for lighting for a hotel.");

  await expect(homePage.quotationForm.getByRole("alert")).toContainText("could not be sent");
  await expect(homePage.quotationForm.locator('button[type="submit"]')).toBeEnabled();
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

import { expect, type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly searchField: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchField = page.getByRole("searchbox", { name: "Search products" });
    this.productCards = page.getByTestId("product-card");
  }

  async open() {
    await this.page.goto("/products");
  }

  async search(query: string) {
    await this.searchField.fill(query);
  }

  async chooseCategory(category: "Decorative lighting" | "Wall art") {
    await this.page.getByRole("button", { name: category, exact: true }).click();
  }

  async expectProductCount(count: number) {
    await expect(this.productCards).toHaveCount(count);
  }
}

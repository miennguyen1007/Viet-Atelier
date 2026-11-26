import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly heroHeading: Locator;
  readonly languageVietnamese: Locator;
  readonly quotationForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroHeading = page.locator(".hero h1");
    this.languageVietnamese = page.getByRole("button", { name: "VI", exact: true });
    this.quotationForm = page.locator(".quotation-form");
  }

  async open() {
    await this.page.goto("/");
  }

  async switchToVietnamese() {
    await this.languageVietnamese.click();
  }

  async requestQuotation(name: string, email: string, message: string) {
    await this.quotationForm.locator('input[name="name"]').fill(name);
    await this.quotationForm.locator('input[name="email"]').fill(email);
    await this.quotationForm.locator('textarea[name="message"]').fill(message);
    await this.quotationForm.locator('button[type="submit"]').click();
  }

  async expectRequestSentNotice() {
    const notice = this.quotationForm.getByRole("status");
    await expect(notice).toBeVisible();
    await expect(notice).toContainText(/đã được gửi|has been sent/);
  }

  async openMobileMenu() {
    await this.page.getByRole("button", { name: /Mở menu|Open menu/ }).click();
  }
}

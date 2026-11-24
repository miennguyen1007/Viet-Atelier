"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getProduct } from "@/lib/products";

export function QuotationForm() {
  const { locale } = useLanguage();
  const isVietnamese = locale === "vi";
  const [notice, setNotice] = useState("");
  const [selectedProductSlug, setSelectedProductSlug] = useState("");

  useEffect(() => {
    const productSlug = new URLSearchParams(window.location.search).get("product") ?? "";
    if (getProduct(productSlug)) {
      setSelectedProductSlug(productSlug);
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(isVietnamese
      ? "Thông tin đã được kiểm tra trên bản mẫu. Form chưa kết nối email/CRM nên yêu cầu chưa được gửi."
      : "Your details were validated in this demo. The form is not connected to email/CRM, so nothing has been sent.");
  }

  const selectedProduct = selectedProductSlug ? getProduct(selectedProductSlug) : undefined;

  return (
    <form className="quotation-form" onSubmit={handleSubmit}>
      {selectedProduct && <>
        <p className="selected-product">{isVietnamese ? "Sản phẩm bạn quan tâm:" : "Product of interest:"} <strong>{selectedProduct.name[locale]}</strong></p>
        <input name="product" type="hidden" value={selectedProduct.slug} />
      </>}
      <label>
        {isVietnamese ? "Họ và tên" : "Your name"}
        <input autoComplete="name" name="name" placeholder={isVietnamese ? "Tên của bạn" : "Your name"} required />
      </label>
      <label>
        {isVietnamese ? "Email công việc" : "Work email"}
        <input autoComplete="email" name="email" placeholder="name@company.com" required type="email" />
      </label>
      <label className="form-wide">
        {isVietnamese ? "Bạn đang tìm kiếm điều gì?" : "Tell us about your project"}
        <textarea name="message" placeholder={isVietnamese ? "Sản phẩm, số lượng dự kiến hoặc nhu cầu dự án..." : "Products, quantities or project requirements..."} required rows={3} />
      </label>
      <button className="button button-dark form-submit" type="submit">
        {isVietnamese ? "Gửi yêu cầu báo giá" : "Request a quotation"} <span aria-hidden="true">↗</span>
      </button>
      {notice && <p aria-live="polite" className="form-notice" role="status">{notice}</p>}
      <p className="form-privacy">
        {isVietnamese ? "Chỉ cung cấp thông tin cần thiết để chúng tôi phản hồi yêu cầu của bạn." : "We only ask for the information needed to respond to your enquiry."}
      </p>
    </form>
  );
}

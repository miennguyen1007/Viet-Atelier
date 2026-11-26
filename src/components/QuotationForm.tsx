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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [selectedProductSlug, setSelectedProductSlug] = useState("");

  useEffect(() => {
    const productSlug = new URLSearchParams(window.location.search).get("product") ?? "";
    if (getProduct(productSlug)) {
      setSelectedProductSlug(productSlug);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setNotice("");

    try {
      const response = await fetch("/api/quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          product: formData.get("product") || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Quotation request could not be sent");
      }

      setStatus("success");
      setNotice(isVietnamese
        ? "Cảm ơn bạn. Yêu cầu đã được gửi đến VIET ATELIER."
        : "Thank you. Your enquiry has been sent to VIET ATELIER.");
      form.reset();
    } catch {
      setStatus("error");
      setNotice(isVietnamese
        ? "Chưa gửi được yêu cầu. Vui lòng thử lại sau."
        : "Your enquiry could not be sent. Please try again later.");
    }
  }

  const selectedProduct = selectedProductSlug ? getProduct(selectedProductSlug) : undefined;

  return (
    <form aria-busy={status === "sending"} className="quotation-form" onSubmit={handleSubmit}>
      {selectedProduct && <>
        <p className="selected-product">{isVietnamese ? "Sản phẩm bạn quan tâm:" : "Product of interest:"} <strong>{selectedProduct.name[locale]}</strong></p>
        <input name="product" type="hidden" value={selectedProduct.slug} />
      </>}
      <label>
        {isVietnamese ? "Họ và tên" : "Your name"}
        <input autoComplete="name" name="name" placeholder={isVietnamese ? "Tên của bạn" : "Your name"} required />
      </label>
      <label>
        <span>
          {isVietnamese ? "Email công việc" : "Work email"}
          <span aria-hidden="true" className="required-mark"> *</span>
        </span>
        <input autoComplete="email" name="email" placeholder="name@company.com" required type="email" />
      </label>
      <label className="form-wide">
        {isVietnamese ? "Bạn đang tìm kiếm điều gì?" : "Tell us about your project"}
        <textarea name="message" placeholder={isVietnamese ? "Sản phẩm, số lượng dự kiến hoặc nhu cầu dự án..." : "Products, quantities or project requirements..."} required rows={3} />
      </label>
      <button className="button button-dark form-submit" disabled={status === "sending"} type="submit">
        {status === "sending"
          ? (isVietnamese ? "Đang gửi..." : "Sending...")
          : (isVietnamese ? "Gửi yêu cầu báo giá" : "Request a quotation")} <span aria-hidden="true">↗</span>
      </button>
      {notice && <p aria-live={status === "error" ? "assertive" : "polite"} className="form-notice" role={status === "error" ? "alert" : "status"}>{notice}</p>}
      <p className="form-privacy">
        {isVietnamese
          ? "Thông tin của bạn sẽ được gửi qua Resend đến email VIET ATELIER để phản hồi yêu cầu."
          : "Your details will be sent via Resend to VIET ATELIER by email so we can respond to your enquiry."}
      </p>
    </form>
  );
}

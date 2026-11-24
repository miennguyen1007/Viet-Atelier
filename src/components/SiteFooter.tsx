"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function SiteFooter() {
  const { locale } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link aria-label="VIET ATELIER home" className="footer-brand" href="/">
          <Image alt="VIET ATELIER" height={72} src="/brand/viet-atelier-logo.png" width={95} />
        </Link>
        <p>{locale === "vi"
          ? "Đồ trang trí mang tinh thần Việt, cho những ngày muốn trở về."
          : "Vietnamese-inspired objects, for the days you long to come home."}</p>
        <a href="/#contact">{locale === "vi" ? "Cùng trao đổi về dự án" : "Let’s talk about your project"} <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VIET ATELIER</span>
        <span>{locale === "vi" ? "Bản mẫu giao diện — nội dung đang được hoàn thiện" : "Website concept — content in progress"}</span>
      </div>
    </footer>
  );
}

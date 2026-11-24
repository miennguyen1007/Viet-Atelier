"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function SiteHeader() {
  const { locale, setLocale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const isVietnamese = locale === "vi";
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Vietatelier home" onClick={closeMenu}>
          <Image
            alt="VIET ATELIER"
            className="brand-logo"
            height={80}
            priority
            src="/brand/viet-atelier-logo.png"
            width={105}
          />
        </Link>
        <button
          aria-expanded={menuOpen}
          aria-label={isVietnamese ? "Mở menu" : "Open menu"}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <Link href="/#home" onClick={closeMenu}>{isVietnamese ? "Trang chủ" : "Home"}</Link>
          <Link href="/#about" onClick={closeMenu}>{isVietnamese ? "Về chúng tôi" : "About Us"}</Link>
          <Link href="/products" onClick={closeMenu}>{isVietnamese ? "Sản phẩm" : "Products"}</Link>
          <Link href="/#projects" onClick={closeMenu}>{isVietnamese ? "Dự án" : "Projects"}</Link>
          <Link href="/#services" onClick={closeMenu}>{isVietnamese ? "Dịch vụ" : "Services"}</Link>
          <Link href="/#contact" onClick={closeMenu}>{isVietnamese ? "Liên hệ" : "Contact"}</Link>
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Choose language">
            <button aria-pressed={locale === "en"} onClick={() => setLocale("en")} type="button">EN</button>
            <span aria-hidden="true">/</span>
            <button aria-pressed={locale === "vi"} onClick={() => setLocale("vi")} type="button">VI</button>
          </div>
          <a className="header-cta" href="/#contact">{isVietnamese ? "Gửi yêu cầu" : "Enquire"}</a>
        </div>
      </div>
    </header>
  );
}

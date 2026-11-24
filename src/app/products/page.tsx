"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/components/LanguageProvider";
import { products, type ProductCategory } from "@/lib/products";

type CategoryFilter = "all" | ProductCategory;

export default function ProductsPage() {
  const { locale } = useLanguage();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const isVietnamese = locale === "vi";

  useEffect(() => {
    const initialCategory = new URLSearchParams(window.location.search).get("category");
    if (initialCategory === "lighting" || initialCategory === "wall-art") {
      setCategory(initialCategory);
    }
  }, []);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesQuery = !normalizedQuery
        || product.name[locale].toLocaleLowerCase(locale).includes(normalizedQuery)
        || product.description[locale].toLocaleLowerCase(locale).includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, locale, query]);

  const filters: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: isVietnamese ? "Tất cả" : "All pieces" },
    { value: "lighting", label: isVietnamese ? "Đèn trang trí" : "Decorative lighting" },
    { value: "wall-art", label: isVietnamese ? "Tranh treo tường" : "Wall art" },
  ];

  return (
    <div className="catalog-page">
      <section className="catalog-heading">
        <span className="eyebrow"><span className="eyebrow-line" /> {isVietnamese ? "VIET ATELIER / SẢN PHẨM" : "VIET ATELIER / THE COLLECTION"}</span>
        <h1>{isVietnamese ? <>Những món đồ<br /><em>đồng điệu cùng bạn.</em></> : <>Objects that<br /><em>feel like yours.</em></>}</h1>
        <p>{isVietnamese
          ? "Đèn trang trí và tranh treo tường được tuyển chọn theo một ngôn ngữ thẩm mỹ. Hình ảnh và tên mẫu hiện là nội dung tham khảo."
          : "Decorative lighting and wall art, selected in a consistent visual language. Images and sample names are for reference."}</p>
      </section>
      <section className="catalog-content" aria-label={isVietnamese ? "Danh mục sản phẩm" : "Product catalogue"}>
        <div className="catalog-toolbar">
          <div className="filter-list" aria-label={isVietnamese ? "Lọc theo danh mục" : "Filter by category"}>
            {filters.map((filter) => <button aria-pressed={category === filter.value} className={category === filter.value ? "filter-button is-active" : "filter-button"} key={filter.value} onClick={() => setCategory(filter.value)} type="button">{filter.label}</button>)}
          </div>
          <label className="search-field">
            <span className="visually-hidden">{isVietnamese ? "Tìm sản phẩm" : "Search products"}</span>
            <span aria-hidden="true">⌕</span>
            <input onChange={(event) => setQuery(event.target.value)} placeholder={isVietnamese ? "Tìm sản phẩm..." : "Search the collection..."} type="search" value={query} />
          </label>
        </div>
        <p aria-live="polite" className="results-count">{isVietnamese ? `${visibleProducts.length} sản phẩm` : `${visibleProducts.length} pieces`}</p>
        {visibleProducts.length > 0
          ? <div className="product-grid catalog-grid">{visibleProducts.map((product, index) => <ProductCard index={index} key={product.slug} locale={locale} product={product} />)}</div>
          : <div className="empty-results"><span aria-hidden="true">✳</span><h2>{isVietnamese ? "Chưa tìm thấy sản phẩm phù hợp" : "No pieces found"}</h2><p>{isVietnamese ? "Thử từ khóa khác hoặc chọn danh mục khác." : "Try another search or choose a different category."}</p><button className="text-link" onClick={() => { setQuery(""); setCategory("all"); }} type="button">{isVietnamese ? "Xóa bộ lọc" : "Clear filters"} ↗</button></div>}
      </section>
      <section className="catalog-enquiry">
        <span>{isVietnamese ? "ĐANG TÌM MẪU CHO DỰ ÁN?" : "SPECIFYING FOR A PROJECT?"}</span>
        <p>{isVietnamese ? "Cho ngôi nhà, không gian hospitality hoặc dự án nội thất của bạn." : "For your home, hospitality space or interior project."}</p>
        <a className="button button-dark" href="/#contact">{isVietnamese ? "Gửi yêu cầu" : "Make an enquiry"} <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}

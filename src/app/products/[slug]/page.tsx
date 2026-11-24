"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = getProduct(params.slug);
  const { locale } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  if (!product) notFound();

  const isVietnamese = locale === "vi";
  const categoryLabel = product.category === "lighting"
    ? (isVietnamese ? "Đèn trang trí" : "Decorative lighting")
    : (isVietnamese ? "Tranh treo tường" : "Wall art");
  const images = [product.image, ...(product.secondaryImage ? [product.secondaryImage] : [])];
  const relatedProducts = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);

  return (
    <div className="detail-page">
      <div className="detail-breadcrumb"><Link href="/">{isVietnamese ? "Trang chủ" : "Home"}</Link><span>/</span><Link href="/products">{isVietnamese ? "Sản phẩm" : "Products"}</Link><span>/</span><span>{product.name[locale]}</span></div>
      <section className="detail-layout">
        <div className="detail-gallery">
          <div className="detail-main-image">
            <Image alt={product.name[locale]} fill priority sizes="(max-width: 800px) 100vw, 58vw" src={images[activeImage]} />
            <span className="image-reference-tag">{isVietnamese ? "ẢNH THAM KHẢO" : "REFERENCE IMAGE"}</span>
          </div>
          {images.length > 1 && <div className="detail-thumbnails">{images.map((image, index) => <button aria-label={`${isVietnamese ? "Xem ảnh" : "View image"} ${index + 1}`} aria-pressed={activeImage === index} className={activeImage === index ? "is-selected" : ""} key={image} onClick={() => setActiveImage(index)} type="button"><Image alt="" fill sizes="100px" src={image} /></button>)}</div>}
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{categoryLabel}</span>
          <h1>{product.name[locale]}</h1>
          <span className="detail-rule" />
          <p>{product.description[locale]}</p>
          <p className="detail-disclaimer">{isVietnamese
            ? "Tên và hình ảnh hiện là nội dung mẫu tham khảo, chưa xác nhận thông số sản phẩm hoặc tình trạng cung ứng."
            : "Names and images are sample references. Product specifications and availability have not been confirmed."}</p>
          <a className="button button-dark detail-cta" href={`/?product=${product.slug}#contact`}>{isVietnamese ? "Yêu cầu báo giá" : "Request a quotation"} <span aria-hidden="true">↗</span></a>
          <Link className="detail-back" href="/products">← {isVietnamese ? "Quay lại sản phẩm" : "Back to the collection"}</Link>
        </div>
      </section>
      <section className="section related-section">
        <div className="section-heading"><div><span className="eyebrow">{isVietnamese ? "CÙNG DANH MỤC" : "MORE TO EXPLORE"}</span><h2>{isVietnamese ? "Có thể bạn cũng thích" : "Consider these pieces"}</h2></div></div>
        <div className="product-grid">{relatedProducts.map((item, index) => <ProductCard key={item.slug} index={index} locale={locale} product={item} />)}</div>
      </section>
    </div>
  );
}

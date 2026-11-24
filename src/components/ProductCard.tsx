import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import type { Locale } from "@/components/LanguageProvider";

type ProductCardProps = {
  product: Product;
  locale: Locale;
  index?: number;
};

export function ProductCard({ product, locale, index = 0 }: ProductCardProps) {
  const categoryLabel = product.category === "lighting"
    ? (locale === "vi" ? "Đèn trang trí" : "Decorative lighting")
    : (locale === "vi" ? "Tranh treo tường" : "Wall art");

  return (
    <article className="product-card" data-testid="product-card">
      <Link className={`product-image image-tone-${index % 4}`} href={`/products/${product.slug}`}>
        <Image alt={product.name[locale]} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 25vw" src={product.image} />
        <span className="product-view">{locale === "vi" ? "Xem sản phẩm" : "View piece"} <span aria-hidden="true">↗</span></span>
      </Link>
      <div className="product-card-copy">
        <span className="product-category">{categoryLabel}</span>
        <Link href={`/products/${product.slug}`}><h3>{product.name[locale]}</h3></Link>
      </div>
    </article>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { ProductCard } from "@/components/ProductCard";
import { QuotationForm } from "@/components/QuotationForm";
import { products } from "@/lib/products";

export default function HomePage() {
  const { locale } = useLanguage();
  const isVietnamese = locale === "vi";

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-line" /> {isVietnamese ? "ĐỒ TRANG TRÍ MANG TINH THẦN VIỆT" : "DECORATIVE OBJECTS, A VIETNAMESE SPIRIT"}</span>
          <h1>{isVietnamese ? <>Cho những ngày<br /><em>muốn trở về.</em></> : <>For the days<br /><em>you long to come home.</em></>}</h1>
          <p>{isVietnamese
            ? "VIET ATELIER chuyển cảm hứng từ thiên nhiên, văn hóa và con người Việt Nam thành đồ trang trí cho không gian sống hiện đại."
            : "Decorative objects shaped by Vietnamese nature, culture and people, made for modern living."}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/products">{isVietnamese ? "Khám phá sản phẩm" : "Explore products"} <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="#contact">{isVietnamese ? "Trao đổi cùng chúng tôi" : "Start a conversation"} <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-index"><span>01</span><span className="index-rule" /><span>04</span><span className="hero-index-label">{isVietnamese ? "BỘ SƯU TẬP" : "THE COLLECTION"}</span></div>
        </div>
        <div className="hero-visual">
          <Image alt={isVietnamese ? "Đèn mây tre phát sáng trong không gian tối — ảnh tham khảo" : "Woven pendant glowing in a dark interior — reference image"} className="hero-image" fill priority sizes="(max-width: 800px) 100vw, 55vw" src="/images/lighting/pexels-w-www-1864370-30828792.jpg" />
          <div className="hero-image-shade" />
          <div className="hero-image-caption"><span>{isVietnamese ? "ÁNH SÁNG TRANG TRÍ" : "DECORATIVE LIGHTING"}</span><span>{isVietnamese ? "Ảnh tham khảo" : "Reference image"}</span></div>
          <span className="hero-side-note">{isVietnamese ? "CHO NHỮNG NGÀY MUỐN TRỞ VỀ — VIET ATELIER" : "FOR THE DAYS YOU LONG TO COME HOME — VIET ATELIER"}</span>
        </div>
      </section>

      <section className="intro-strip" id="about">
        <span className="eyebrow">{isVietnamese ? "VIET ATELIER / CHÚNG TÔI LÀ AI?" : "VIET ATELIER / OUR POINT OF VIEW"}</span>
        <p>{isVietnamese
          ? "Chúng tôi chọn lọc và chế tác những món đồ trang trí mang tinh thần Việt, với ngôn ngữ thẩm mỹ nhất quán cho không gian sống hiện đại."
          : "We curate and craft decorative objects with a Vietnamese spirit and a consistent point of view for modern living."}</p>
        <span className="intro-mark" aria-hidden="true">VA</span>
      </section>

      <section className="section featured-section" id="featured">
        <div className="section-heading">
          <div><span className="eyebrow">{isVietnamese ? "TUYỂN CHỌN" : "SELECTED OBJECTS"}</span><h2>{isVietnamese ? "Bộ sưu tập" : "The collection"}</h2></div>
          <Link className="text-link" href="/products">{isVietnamese ? "Xem tất cả sản phẩm" : "View all products"} <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((product, index) => <ProductCard key={product.slug} index={index} locale={locale} product={product} />)}
        </div>
        <p className="sample-content-note">{isVietnamese
          ? "Ảnh và tên sản phẩm hiện là nội dung mẫu tham khảo, chưa phải danh mục chính thức của VIET ATELIER."
          : "Images and product names are sample references, not an approved VIET ATELIER catalogue."}</p>
      </section>

      <section className="collections-section" id="collections">
        <div className="section-heading">
          <div><span className="eyebrow">{isVietnamese ? "KHÁM PHÁ THEO DANH MỤC" : "FIND YOUR POINT OF VIEW"}</span><h2>{isVietnamese ? "Bộ sưu tập" : "Our collections"}</h2></div>
          <p>{isVietnamese ? "Đèn trang trí và tranh treo tường, cùng một ngôn ngữ thẩm mỹ." : "Decorative lighting and wall art, selected in a consistent visual language."}</p>
        </div>
        <div className="collection-grid">
          <Link className="collection-card collection-lighting" href="/products?category=lighting">
            <Image alt={isVietnamese ? "Đèn trang trí trong không gian nội thất — ảnh tham khảo" : "Decorative pendant lights — reference image"} fill sizes="(max-width: 700px) 100vw, 50vw" src="/images/lighting/pexels-jorrynmorais-27826201.jpg" />
            <span className="collection-overlay" />
            <span className="collection-number">01 / 02</span>
            <span className="collection-copy"><span>{isVietnamese ? "TẠO NÊN BẦU KHÔNG KHÍ" : "SETTING THE ATMOSPHERE"}</span><strong>{isVietnamese ? "Đèn trang trí" : "Decorative lighting"}</strong><span className="collection-explore">{isVietnamese ? "Khám phá danh mục" : "Explore collection"} ↗</span></span>
          </Link>
          <Link className="collection-card collection-art" href="/products?category=wall-art">
            <Image alt={isVietnamese ? "Tranh nghệ thuật trong nội thất — ảnh tham khảo" : "Framed wall art in an interior — reference image"} fill sizes="(max-width: 700px) 100vw, 50vw" src="/images/wall-art/pexels-dubai-media-401525600-20531741.jpg" />
            <span className="collection-overlay" />
            <span className="collection-number">02 / 02</span>
            <span className="collection-copy"><span>{isVietnamese ? "THÊM CHIỀU SÂU CHO BỨC TƯỜNG" : "A FINAL LAYER FOR THE ROOM"}</span><strong>{isVietnamese ? "Tranh treo tường" : "Wall art"}</strong><span className="collection-explore">{isVietnamese ? "Khám phá danh mục" : "Explore collection"} ↗</span></span>
          </Link>
        </div>
      </section>

      <section className="editorial-section" id="projects">
        <div className="editorial-image">
          <Image alt={isVietnamese ? "Tranh trừu tượng trong không gian nội thất — ảnh tham khảo, không phải dự án đã xác nhận" : "Abstract wall art in a refined interior — reference image, not a confirmed project"} fill sizes="(max-width: 800px) 100vw, 50vw" src="/images/wall-art/pexels-dubai-media-401525600-20531741.jpg" />
          <span className="image-reference-tag">{isVietnamese ? "ẢNH THAM KHẢO" : "REFERENCE IMAGE"}</span>
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">{isVietnamese ? "GÓC NHÌN KHÁCH HÀNG" : "CUSTOMER PERSONA INSIGHT"}</span>
          <h2>{isVietnamese
            ? <>“Tôi không tìm một món đồ đẹp.<br /><em>Tôi tìm những món đồ giúp ngôi nhà kể đúng câu chuyện của mình.”</em></>
            : <>“I’m not looking for a beautiful object.<br /><em>I’m looking for objects that tell my home’s story.”</em></>}</h2>
          <p>{isVietnamese
            ? "Đây là insight trong tài liệu chân dung khách hàng, không phải lời chứng thực của một khách hàng cụ thể."
            : "This is an insight from the supplied customer persona, not a quotation from an individual customer."}</p>
          <a className="text-link" href="/products">{isVietnamese ? "Tìm món đồ đồng điệu" : "Find your piece"} <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="services-heading"><span className="eyebrow">{isVietnamese ? "GIÁ TRỊ CỐT LÕI" : "WHAT GUIDES US"}</span><h2>{isVietnamese ? "Ít nhưng tinh." : "Fewer things. Chosen well."}</h2></div>
        <div className="service-list">
          {(isVietnamese
            ? [["01", "Gu thẩm mỹ", "Tinh tế, hài hòa và dễ ứng dụng."], ["02", "Chế tác", "Chỉn chu trong từng chi tiết."], ["03", "Bản sắc Việt", "Cảm hứng từ thiên nhiên, văn hóa và con người Việt Nam."], ["04", "Luôn cải tiến", "Không ngừng hoàn thiện sản phẩm và trải nghiệm."]]
            : [["01", "A clear point of view", "Refined, harmonious and easy to live with."], ["02", "Made with care", "Attention to detail in every finish."], ["03", "A Vietnamese spirit", "Inspired by the nature, culture and people of Vietnam."], ["04", "Always evolving", "An ongoing care for our objects and experience."]]
          ).map(([number, title, description]) => <div className="service-row" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><span className="service-arrow" aria-hidden="true">↗</span></div>)}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-intro">
          <span className="eyebrow">{isVietnamese ? "BẮT ĐẦU CUỘC TRÒ CHUYỆN" : "START A CONVERSATION"}</span>
          <h2>{isVietnamese ? <>Cho những ngày<br />muốn trở về.</> : <>For the days<br />you long to come home.</>}</h2>
          <p>{isVietnamese ? "Bạn đang tìm món đồ cho nhà mình hay một dự án nội thất, khách sạn? Hãy chia sẻ đôi điều cùng VIET ATELIER." : "Looking for something for home or a hospitality interior? Tell VIET ATELIER a little about what you have in mind."}</p>
          <div className="contact-phone">
            <span>{isVietnamese ? "Điện thoại" : "Call us"}</span>
            <a href="tel:+84901462897">0901.462.897</a>
          </div>
          <div className="contact-aside-note">{isVietnamese ? "Yêu cầu sẽ được gửi qua email sau khi cấu hình thông tin gửi thư trong hệ thống." : "Enquiries are sent by email once the delivery settings are configured."}</div>
        </div>
        <QuotationForm />
      </section>
    </>
  );
}

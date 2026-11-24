export type ProductCategory = "lighting" | "wall-art";

export type Product = {
  slug: string;
  category: ProductCategory;
  image: string;
  secondaryImage?: string;
  name: { en: string; vi: string };
  description: { en: string; vi: string };
};

export const products: Product[] = [
  {
    slug: "woven-pendant-01",
    category: "lighting",
    image: "/images/lighting/pexels-lux-werk-2148504350-30502160.jpg",
    secondaryImage: "/images/lighting/pexels-w-www-1864370-30828792.jpg",
    name: { en: "Woven Pendant 01", vi: "Đèn thả đan 01" },
    description: {
      en: "A warm, sculptural lighting reference.",
      vi: "Gợi ý đèn trang trí với hình khối ấm áp.",
    },
  },
  {
    slug: "woven-pendant-02",
    category: "lighting",
    image: "/images/lighting/pexels-w-www-1864370-30828792.jpg",
    name: { en: "Woven Pendant 02", vi: "Đèn thả đan 02" },
    description: {
      en: "A pendant with a quiet, natural silhouette.",
      vi: "Dáng đèn trang trí nhẹ nhàng, gần gũi với thiên nhiên.",
    },
  },
  {
    slug: "ambient-table-lamp-01",
    category: "lighting",
    image: "/images/lighting/pexels-yu-xin-2154361082-33661398.jpg",
    name: { en: "Ambient Table Lamp 01", vi: "Đèn bàn ánh dịu 01" },
    description: {
      en: "Soft, ambient light for an unhurried evening.",
      vi: "Ánh sáng dịu cho những khoảnh khắc thư thái.",
    },
  },
  {
    slug: "lantern-lighting-01",
    category: "lighting",
    image: "/images/lighting/pexels-jorrynmorais-27826201.jpg",
    name: { en: "Lantern Lighting 01", vi: "Đèn lồng trang trí 01" },
    description: {
      en: "A lantern silhouette with a warm presence.",
      vi: "Dáng đèn lồng tạo cảm giác ấm áp cho không gian.",
    },
  },
  {
    slug: "decorative-lighting-02",
    category: "lighting",
    image: "/images/lighting/pexels-vi-t-anh-nguy-n-2150409023-31408461.jpg",
    name: { en: "Decorative Lighting 02", vi: "Đèn trang trí 02" },
    description: {
      en: "A lighting scene shown as a visual reference.",
      vi: "Khung cảnh ánh sáng dùng làm hình ảnh tham khảo.",
    },
  },
  {
    slug: "abstract-study-01",
    category: "wall-art",
    image: "/images/wall-art/pexels-dubai-media-401525600-20531741.jpg",
    secondaryImage: "/images/wall-art/pexels-anntarazevich-5481237.jpg",
    name: { en: "Abstract Study 01", vi: "Tranh trừu tượng 01" },
    description: {
      en: "A graphic composition styled in a calm interior.",
      vi: "Tác phẩm hình khối được trưng bày trong không gian nhẹ nhàng.",
    },
  },
  {
    slug: "abstract-study-02",
    category: "wall-art",
    image: "/images/wall-art/pexels-knownasovan-545575.jpg",
    name: { en: "Abstract Study 02", vi: "Tranh trừu tượng 02" },
    description: {
      en: "A minimal framed artwork reference for contemporary rooms.",
      vi: "Gợi ý tranh đóng khung tối giản cho không gian đương đại.",
    },
  },
  {
    slug: "graphic-art-01",
    category: "wall-art",
    image: "/images/wall-art/pexels-duygugungor-19949505.jpg",
    name: { en: "Graphic Art 01", vi: "Tranh đồ họa 01" },
    description: {
      en: "A graphic artwork reference with warm, expressive color.",
      vi: "Gợi ý tranh đồ họa với sắc độ ấm và giàu biểu cảm.",
    },
  },
  {
    slug: "framed-art-01",
    category: "wall-art",
    image: "/images/wall-art/pexels-knownasovan-545575.jpg",
    name: { en: "Framed Art 01", vi: "Tranh khung 01" },
    description: {
      en: "A quiet typographic artwork reference in a dark interior.",
      vi: "Gợi ý tranh chữ tối giản trong không gian tông trầm.",
    },
  },
  {
    slug: "framed-art-02",
    category: "wall-art",
    image: "/images/wall-art/pexels-pauline-raw-131148428-35891295.jpg",
    name: { en: "Framed Art 02", vi: "Tranh khung 02" },
    description: {
      en: "A contemporary art reference styled for a refined room.",
      vi: "Gợi ý tranh đương đại trong không gian nội thất tinh giản.",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

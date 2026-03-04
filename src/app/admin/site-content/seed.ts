import { prisma } from "@/lib/prisma";

type SiteContentDefault = {
  key: string;
  value: string;
  label: string;
  group: string;
};

const SITE_CONTENT_DEFAULTS: SiteContentDefault[] = [
  // === Hero Section ===
  {
    key: "hero_heading",
    value: "Traditional Bahawalpuri Suits",
    label: "Hero Heading",
    group: "hero",
  },
  {
    key: "hero_subheading",
    value: "Experience tradition, woven into every thread.",
    label: "Hero Subheading",
    group: "hero",
  },
  // === New Arrivals Section ===
  {
    key: "new_arrivals_heading",
    value: "New Arrivals",
    label: "New Arrivals Heading",
    group: "home-page",
  },
  {
    key: "new_arrivals_subheading",
    value: "Fresh Selections",
    label: "New Arrivals Subheading",
    group: "home-page",
  },
  // === Feature Cards ===
  {
    key: "feature_card_1_title",
    value: "Deliver with Quality",
    label: "Feature Card 1 Title",
    group: "feature-cards",
  },
  {
    key: "feature_card_1_description",
    value:
      "Each product is crafted with attention to detail and quality materials, ensuring durability and comfort.",
    label: "Feature Card 1 Description",
    group: "feature-cards",
  },
  {
    key: "feature_card_2_title",
    value: "Designed to Impress",
    label: "Feature Card 2 Title",
    group: "feature-cards",
  },
  {
    key: "feature_card_2_description",
    value:
      "Our products feature sleek designs and modern aesthetics, making them a stylish addition to any wardrobe.",
    label: "Feature Card 2 Description",
    group: "feature-cards",
  },
  {
    key: "feature_card_3_title",
    value: "Curated for You",
    label: "Feature Card 3 Title",
    group: "feature-cards",
  },
  {
    key: "feature_card_3_description",
    value:
      "We carefully select each item to meet high standards of style, comfort, and functionality.",
    label: "Feature Card 3 Description",
    group: "feature-cards",
  },
  // === Collections Section ===
  {
    key: "collections_heading",
    value: "Collections",
    label: "Collections Heading",
    group: "home-page",
  },
  {
    key: "collections_subheading",
    value: "Curated for quality",
    label: "Collections Subheading",
    group: "home-page",
  },
  // === News Section ===
  {
    key: "news_heading",
    value: "Our News",
    label: "News Section Heading",
    group: "home-page",
  },
  {
    key: "news_subheading",
    value: "Explore The Trends",
    label: "News Section Subheading",
    group: "home-page",
  },
  // === Video Section ===
  {
    key: "video_section_text",
    value:
      "Discover a brand where style, quality, and craftsmanship come together.",
    label: "Video Section Text",
    group: "home-page",
  },
  // === About Page ===
  {
    key: "about_subtitle",
    value:
      "Get to know who we are, what we stand for, and why we love what we do.",
    label: "About Page Subtitle",
    group: "about-page",
  },
  {
    key: "about_team_heading",
    value: "Meet Our Team",
    label: "Team Section Heading",
    group: "about-page",
  },
  {
    key: "about_team_subheading",
    value: "The superheroes",
    label: "Team Section Subheading",
    group: "about-page",
  },
  // === About Feature Cards ===
  {
    key: "about_feature_1_title",
    value: "Premium Quality",
    label: "About Feature 1 Title",
    group: "about-features",
  },
  {
    key: "about_feature_1_description",
    value:
      "We source only the finest materials to ensure every piece meets our high standards of excellence.",
    label: "About Feature 1 Description",
    group: "about-features",
  },
  {
    key: "about_feature_2_title",
    value: "Sustainable Fashion",
    label: "About Feature 2 Title",
    group: "about-features",
  },
  {
    key: "about_feature_2_description",
    value:
      "Committed to eco-friendly practices and ethical production methods that protect our planet.",
    label: "About Feature 2 Description",
    group: "about-features",
  },
  {
    key: "about_feature_3_title",
    value: "Expert Craftsmanship",
    label: "About Feature 3 Title",
    group: "about-features",
  },
  {
    key: "about_feature_3_description",
    value:
      "Each item is carefully crafted by skilled artisans with decades of combined experience.",
    label: "About Feature 3 Description",
    group: "about-features",
  },
  {
    key: "about_feature_4_title",
    value: "Customer First",
    label: "About Feature 4 Title",
    group: "about-features",
  },
  {
    key: "about_feature_4_description",
    value:
      "Your satisfaction is our priority with dedicated support and hassle-free returns.",
    label: "About Feature 4 Description",
    group: "about-features",
  },
  // === Newsletter ===
  {
    key: "newsletter_heading",
    value: "Stay Ahead with Exclusive Deals!",
    label: "Newsletter Heading",
    group: "newsletter",
  },
  {
    key: "newsletter_description",
    value:
      "Be the first to know about special offers, new product drops, and insider updates. Join our newsletter and get exclusive perks delivered straight to your inbox!",
    label: "Newsletter Description",
    group: "newsletter",
  },
  // === Shipping ===
  {
    key: "shipping_charge",
    value: "0",
    label: "Shipping Charge (e.g. 10.00, set 0 for free shipping)",
    group: "shipping",
  },
  // === Announcement Marquee ===
  {
    key: "announcement_active",
    value: "true",
    label: "Active (true / false)",
    group: "announcement-marquee",
  },
  {
    key: "announcement_bg_color",
    value: "#1c1917",
    label: "Background Color",
    group: "announcement-marquee",
  },
  {
    key: "announcement_text_color",
    value: "#f5f5f4",
    label: "Text Color",
    group: "announcement-marquee",
  },
  {
    key: "announcement_separator_color",
    value: "#78716c",
    label: "Separator / Divider Color",
    group: "announcement-marquee",
  },
  {
    key: "announcement_texts",
    value:
      "Free Worldwide Shipping on orders over Rs.2000\nNew Spring Collection Has Arrived\nSustainably Crafted Luxury\nSign up for 15% off your first order",
    label: "Announcement Lines (one per line)",
    group: "announcement-marquee",
  },
  // === Product Marquee ===
  {
    key: "product_marquee_active",
    value: "true",
    label: "Active (true / false)",
    group: "product-marquee",
  },
  {
    key: "marquee_product_ids",
    value: "",
    label: "Product IDs (comma-separated, empty = latest 12 active products)",
    group: "product-marquee",
  },
  // === Partner Logos Marquee ===
  {
    key: "partners_marquee_active",
    value: "true",
    label: "Active (true / false)",
    group: "partner-logos-marquee",
  },
  {
    key: "partners_heading",
    value: "Our Partners",
    label: "Section Heading",
    group: "partner-logos-marquee",
  },
  {
    key: "partners_logos",
    value: "LVMH\nKERING\nRICHEMONT\nCAPRI\nTAPESTRY\nPRADA GROUP",
    label: "Partner Names (one per line)",
    group: "partner-logos-marquee",
  },
];

export async function seedSiteContentDefaults() {
  for (const item of SITE_CONTENT_DEFAULTS) {
    const existing = await prisma.siteContent.findUnique({
      where: { key: item.key },
    });
    if (!existing) {
      await prisma.siteContent.create({
        data: item,
      });
    }
  }
}

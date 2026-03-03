import Link from "next/link";
import type { Metadata } from "next";

import {
  SectionHeading,
  BaseSection,
  AnimateFadeIn,
  AnimateStagger,
  HeroSection,
  ProductTile,
  Button,
  FeatureCard,
  CollectionTile,
  ReviewCardsSection,
  HomeVideoSection,
  BlogLargeTile,
  BlogTile,
  getButtonStyles,
} from "@/components";
import { HomeVideoSectionWrapper } from "@/components/common/HomeVideoSection/HomeVideoSectionClient";
import { routes, screamingSnakeToTitle } from "@/lib";
import {
  getHomePageBlogs,
  getFeaturedProducts,
  getCollections,
  getSiteContentMap,
  getActiveTestimonials,
} from "@/lib/server/queries";

export const metadata: Metadata = {
  title: {
    absolute: "Saaj Tradition",
  },
};

export default async function HomePage() {
  // === QUERIES ===
  const products = await getFeaturedProducts();
  const productsList = products.success ? products.data : [];

  const blogPostsResponse = await getHomePageBlogs();
  const blogPosts = blogPostsResponse.success ? blogPostsResponse.data : [];

  const collectionsResponse = await getCollections();
  const collections = collectionsResponse.success
    ? collectionsResponse.data
    : [];

  const contentMapResponse = await getSiteContentMap();
  const c = contentMapResponse.success ? contentMapResponse.data : {};

  const testimonialsResponse = await getActiveTestimonials();
  const testimonials = (
    testimonialsResponse.success ? testimonialsResponse.data : []
  ).map((t) => ({
    rating: t.rating,
    reviewText: t.text,
    reviewerName: t.name,
    reviewerTitle: "",
    reviewerImageUrl: t.imageSrc || "",
  }));

  return (
    <main>
      <HeroSection
        heading={c.hero_heading}
        subheading={c.hero_subheading}
      />

      <BaseSection className="py-16 xl:py-20" id="hero-image">
        <div className="flex flex-col gap-8">
          <div className="flex items-end">
            <SectionHeading
              heading={c.new_arrivals_heading || "New Arrivals"}
              subheading={c.new_arrivals_subheading || "Fresh Selections"}
            />
            <Link
              className={getButtonStyles(
                "light",
                "ms-auto h-fit hidden md:block",
              )}
              href={routes.shop}
            >
              {"View all products"}
            </Link>
          </div>

          <AnimateFadeIn className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {productsList.map((product) => (
              <ProductTile
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={Number(product.price)}
                compareAtPrice={product.compareAtPrice ? Number(product.compareAtPrice) : null}
                primaryImageUrl={product.images[0]}
                hoverImageUrl={product.images[1]}
              />
            ))}
          </AnimateFadeIn>

          <Button
            className="w-full md:hidden"
            variant="light"
            text={"View all products"}
          />
        </div>
      </BaseSection>

      <div className="relative border-y border-neutral-03">
        <BaseSection
          id="feature-cards"
          className="relative py-16 xl:py-20 overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-16 xl:h-20 bg-white z-10" />
          <AnimateStagger
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 md:gap-20 xl:gap-6 animate-y-mobile md:animate-y-tablet xl:animate-y-desktop"
            staggerDelay={0.2}
            duration="long"
          >
            <FeatureCard
              number="01"
              title={c.feature_card_1_title || "Deliver with Quality"}
              description={c.feature_card_1_description || "Each product is crafted with attention to detail and quality materials, ensuring durability and comfort."}
            />
            <FeatureCard
              number="02"
              title={c.feature_card_2_title || "Designed to Impress"}
              description={c.feature_card_2_description || "Our products feature sleek designs and modern aesthetics, making them a stylish addition to any wardrobe."}
            />
            <FeatureCard
              number="03"
              title={c.feature_card_3_title || "Curated for You"}
              description={c.feature_card_3_description || "We carefully select each item to meet high standards of style, comfort, and functionality."}
            />
          </AnimateStagger>
        </BaseSection>
      </div>

      <BaseSection className="py-16 xl:py-20" id="collections-section">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <SectionHeading
            heading={c.collections_heading || "Collections"}
            subheading={c.collections_subheading || "Curated for quality"}
          />
          {collections.map((collection) => (
            <CollectionTile
              key={collection.name}
              title={collection.name}
              description={collection.tagline}
              imageUrl={collection.imageUrl}
              href={routes.shopCollections + `/${collection.slug}`}
            />
          ))}
        </div>
      </BaseSection>

      <div className="relative bg-main-01">
        <ReviewCardsSection reviews={testimonials} />
      </div>

      <HomeVideoSectionWrapper>
        <HomeVideoSection text={c.video_section_text} />
      </HomeVideoSectionWrapper>

      <BaseSection
        className="py-16 xl:py-20 flex flex-col gap-8"
        id="home-news-section"
      >
        <div className="flex justify-between items-end">
          <SectionHeading heading={c.news_heading || "Our News"} subheading={c.news_subheading || "Explore The Trends"} />
          <Link
            className={getButtonStyles(
              "light",
              "ms-auto h-fit hidden md:inline-block",
            )}
            href={routes.blog}
          >
            View all posts
          </Link>
        </div>
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-6">
          {blogPosts.length === 0 && (
            <p className="text-neutral-10 text-base font-bold">
              No blog posts available.
            </p>
          )}
          {blogPosts && blogPosts.length > 0 && (
            <>
              <div className="hidden md:flex flex-1">
                <BlogLargeTile
                  href={`${routes.blog}/${blogPosts[0].slug}`}
                  title={blogPosts[0].title}
                  description={blogPosts[0].description}
                  imageUrl={blogPosts[0].blogImageUrl}
                  alt={blogPosts[0].title}
                  category={screamingSnakeToTitle(blogPosts[0].category)}
                  datePublished={blogPosts[0].updatedAt}
                  timeToRead={blogPosts[0].duration}
                  profileImageUrl={blogPosts[0].author.avatarUrl}
                  authorName={blogPosts[0].author.name}
                  authorJobTitle={blogPosts[0].author.occupation}
                />
              </div>
              <div className="flex-1 gap-12 xl:gap-0 justify-between flex flex-col">
                <BlogTile
                  className="block md:hidden"
                  href={`${routes.blog}/${blogPosts[0].slug}`}
                  title={blogPosts[0].title}
                  description={blogPosts[0].description}
                  imageUrl={blogPosts[0].blogImageUrl}
                  alt={blogPosts[0].title}
                  category={screamingSnakeToTitle(blogPosts[0].category)}
                />
                {blogPosts.slice(1, 4).map((post) => (
                  <BlogTile
                    key={post.id}
                    href={`${routes.blog}/${post.slug}`}
                    title={post.title}
                    description={post.description}
                    imageUrl={post.blogImageUrl}
                    alt={post.title}
                    category={screamingSnakeToTitle(post.category)}
                  />
                ))}
              </div>
            </>
          )}
          <Link
            className={getButtonStyles("light", "w-full h-fit md:hidden")}
            href={routes.blog}
          >
            View all posts
          </Link>
        </div>
      </BaseSection>
    </main>
  );
}

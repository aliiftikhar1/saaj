import {
  AnimatedHeadingText,
  AnimateFadeIn,
  BaseSection,
  BlogTile,
} from "@/components";
import type { Metadata } from "next";
import { routes, screamingSnakeToTitle } from "@/lib";
import { getBlogs } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  // === QUERIES ===
  const blogs = await getBlogs();

  return (
    <main>
      <BaseSection id="blog-page" className="pb-16 flex flex-col gap-8">
        <div className="pt-6 md:pt-10 pb-6">
          <AnimatedHeadingText
            disableIsInView
            className="pb-1"
            variant="page-title"
            text="Our News"
          />
          <p className="text-neutral-10 text-base">
            Stories, updates and inspirations from our shop to you.
          </p>
        </div>
        {!blogs.success ||
          (blogs.data.length === 0 && (
            <p className="text-neutral-10 text-base font-bold">
              No blog posts available.
            </p>
          ))}
        {blogs.success && blogs.data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogs.data
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime(),
              )
              .map((blog, index) => (
                <AnimateFadeIn key={blog.id}>
                  <BlogTile
                    isBlogPage={true}
                    href={routes.blog + "/" + blog.slug}
                    title={blog.title}
                    description={blog.description}
                    imageUrl={blog.blogImageUrl}
                    alt={blog.title}
                    category={screamingSnakeToTitle(blog.category)}
                    priority={index < 3}
                  />
                </AnimateFadeIn>
              ))}
          </div>
        )}
      </BaseSection>
    </main>
  );
}

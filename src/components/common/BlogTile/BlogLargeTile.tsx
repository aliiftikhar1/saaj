import Link from "next/link";

import { ProfileDetails } from "../ProfileDetails";
import { BlogTileImage } from "./BlogTileImage";
import { BlogTileProps } from "./BlogTile";
import { formatBlogDate } from "@/lib";

export type BlogLargeTileProps = BlogTileProps & {
  datePublished: Date;
  timeToRead: number;
  profileImageUrl: string;
  authorName: string;
  authorJobTitle: string;
};

export function BlogLargeTile(props: BlogLargeTileProps) {
  // === PROPS ===
  const {
    href,
    title,
    description,
    imageUrl,
    alt,
    category,
    datePublished,
    timeToRead,
    profileImageUrl,
    authorName,
    authorJobTitle,
  } = props;

  return (
    <Link href={href} className="flex group flex-col w-full h-[648px] gap-6 ">
      <div className="relative w-full flex-1 ">
        <BlogTileImage
          sizes="(max-width: 1280px) 100vw, 50vw"
          isLargeTile={true}
          imageUrl={imageUrl}
          alt={alt}
          category={category}
        />
      </div>
      <div className="p-8 rounded-sm h-75 bg-main-01 flex flex-col gap-6 ">
        <h3 className="text-3xl xl:text-4xl">{title}</h3>
        <p className="text-neutral-10">{description}</p>

        <div className="flex items-center justify-between mt-auto">
          <ProfileDetails
            className="mt-auto"
            reviewerImageUrl={profileImageUrl}
            reviewerName={authorName}
            reviewerTitle={authorJobTitle}
          />
          <div className="text-sm text-neutral-10">
            <span>{formatBlogDate(datePublished)}</span>
            {" • "}
            <span>{timeToRead} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

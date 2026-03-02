import { cn } from "@/lib";
import Image from "next/image";

type BlogTileImageProps = {
  isBlogPage?: boolean;
  sizes?: string;
  isLargeTile?: boolean;
  imageUrl: string;
  alt: string;
  category: string;
  priority?: boolean;
};

export function BlogTileImage(props: BlogTileImageProps) {
  // === PROPS ===
  const {
    isBlogPage = false,
    sizes,
    isLargeTile = false,
    imageUrl,
    alt,
    category,
    priority = false,
  } = props;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-sm">
      {/*Category Label Overlay*/}
      <div className="absolute inset-0 flex justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out z-20">
        <div className="bg-black h-fit text-sm text-white py-1 px-3 rounded-2xl transform -translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          {category}
        </div>
      </div>

      {/*Border Overlay*/}
      <div className="absolute inset-0 border-0 border-white/0 group-hover:border-white group-hover:border-10 transition-all duration-500 ease-out w-full h-full z-20" />

      {/*Blog Image*/}
      <div
        className={cn(
          isLargeTile && "absolute inset-0 w-full h-full",
          !isLargeTile && "relative overflow-hidden rounded-sm h-full",
          !isLargeTile && isBlogPage && "aspect-video",
          !isLargeTile && !isBlogPage && "aspect-video xl:aspect-4/3",
        )}
      >
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="absolute w-full h-full object-cover rounded-sm"
        />
      </div>
    </div>
  );
}

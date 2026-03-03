import { cn } from "@/lib";

type HomeVideoSectionProps = {
  text?: string;
};

export function HomeVideoSection({
  text = "Discover a brand where style, quality, and craftsmanship come together.",
}: HomeVideoSectionProps) {
  return (
    <>
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/assets/video-home-poster.png"
      >
        <source src="/assets/video-home.webm" type="video/webm" />
        <source src="/assets/video-home-com.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={cn(
          "absolute inset-0 rounded-sm",
          "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_15%,rgba(0,0,0,0.6)_100%)]",
          "sm:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_30%,rgba(0,0,0,0.6)_100%)]",
          "xl:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.6)_100%)]",
        )}
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <h2 className="pb-16 px-4 sm:px-10 md:px-18 lg:px-30 xl:px-40 text-white text-center text-3xl sm:text-4xl md:text-5xl xl:text-6xl max-w-[1350px]">
          {text}
        </h2>
      </div>
    </>
  );
}

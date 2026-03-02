import Image from "next/image";

type TeamMemberCardProps = {
  imageSrc: string;
  name: string;
  position: string;
  sizes?: string;
};

export function TeamMemberCard(props: TeamMemberCardProps) {
  // === PROPS ===
  const {
    imageSrc,
    name,
    position,
    sizes = "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
  } = props;

  return (
    <div className="relative aspect-square group">
      <Image
        className="object-cover rounded-sm"
        src={imageSrc}
        alt={name}
        fill
        sizes={sizes}
      />
      <div className="absolute inset-0 rounded-sm bg-linear-to-t from-black/60 to-transparent opacity-100 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white z-10">
        <h3 className="text-xl xl:text-2xl font-medium">{name}</h3>
        <p className="text-base text-neutral-04">{position}</p>
      </div>
    </div>
  );
}

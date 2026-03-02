type FeatureCardProps = {
  number: string;
  title: string;
  description: string;
};

export function FeatureCard(props: FeatureCardProps) {
  // === PROPS ===
  const { number, title, description } = props;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-neutral-09 text-base md:text-lg">{number}</p>
      <h4 className="text-xl md:text-2xl">{title}</h4>
      <p className="text-neutral-10 text-base">{description}</p>
    </div>
  );
}

import { AnimatedHeadingText } from "../AnimatedHeadingText";

type SectionHeadingProps = {
  heading: string;
  subheading: string;
};

export function SectionHeading(props: SectionHeadingProps) {
  // === PROPS ===
  const { heading, subheading } = props;

  return (
    <div className="flex flex-col gap-4">
      <AnimatedHeadingText
        text={heading}
        variant="home-screen"
        className="text-4xl! md:text-5xl! xl:text-6xl!"
      />
      <p className="text-neutral-10 uppercase text-md md:text-lg">
        {subheading}
      </p>
    </div>
  );
}

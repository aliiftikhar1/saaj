type AdminHeadingProps = {
  heading: string;
};

export function AdminHeading(props: AdminHeadingProps) {
  // === PROPS ===
  const { heading } = props;
  return <h1 className="text-black my-2 font-semibold text-3xl">{heading}</h1>;
}

import Link from "next/link";

type BreadCrumbProps = {
  items: { label: string; href?: string }[];
};

export function BreadCrumb(props: BreadCrumbProps) {
  // === PROPS ===
  const { items } = props;
  return (
    <nav>
      <ol className="flex items-center">
        {items.map((item, index) => (
          <li className="flex text-neutral-10 text-sm" key={item.label}>
            <Link className="p-1" href={item.href ?? "#"}>
              <p>{item.label}</p>
            </Link>
            {index < items.length - 1 && (
              <span className="mx-1 self-center">{"/"}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

import React from "react";

export function BaseSection({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 md:px-10 xl:px-12 ${className} mx-auto`}
    >
      {children}
    </section>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

import { AdminHeading, AdminButton, AdminTestimonialsTable } from "@/components/admin";
import { getTestimonials } from "@/lib/server/queries";
import { adminRoutes } from "@/lib";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminHeading heading="Testimonials" />
        <Link href={adminRoutes.testimonialsCreate}>
          <AdminButton>Add Testimonial</AdminButton>
        </Link>
      </div>
      {testimonials.success ? (
        <AdminTestimonialsTable testimonials={testimonials.data} />
      ) : (
        <p className="mt-4 text-red-600">Error loading testimonials.</p>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdminHeading, AdminTestimonialsForm } from "@/components/admin";
import { getTestimonialById } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Edit Testimonial",
};

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial.success || !testimonial.data) {
    notFound();
  }

  return (
    <div>
      <AdminHeading heading="Edit Testimonial" />
      <AdminTestimonialsForm isEditMode testimonialData={testimonial.data} />
    </div>
  );
}

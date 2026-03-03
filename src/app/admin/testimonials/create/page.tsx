import type { Metadata } from "next";
import { AdminHeading, AdminTestimonialsForm } from "@/components/admin";

export const metadata: Metadata = {
  title: "Create Testimonial",
};

export default function CreateTestimonialPage() {
  return (
    <div>
      <AdminHeading heading="Create Testimonial" />
      <AdminTestimonialsForm />
    </div>
  );
}

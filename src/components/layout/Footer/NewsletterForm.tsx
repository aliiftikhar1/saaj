"use client";

import { useActionState } from "react";
import { Input, Button } from "@/components";
import { subscribeToNewsletter } from "@/lib/server/actions/newsletter-actions";

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <label className="text-white" htmlFor="newsletter">
        <h5>Newsletter</h5>
      </label>
      <div className="flex flex-col md:flex-row w-full gap-2">
        <Input
          className="flex-1 w-full md:w-auto"
          id="newsletter"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Button
          className="w-full md:w-auto"
          variant="dark-alternative"
          text={isPending ? "Subscribing..." : "Sign up to newsletter"}
          type="submit"
          disabled={isPending}
          isLoading={isPending}
        />
      </div>
      {state?.message && (
        <p
          className={`text-sm mt-1 ${state.success ? "text-green-400" : "text-red-400"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

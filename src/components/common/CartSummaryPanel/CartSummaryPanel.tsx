import { CartSummary } from "@/types/client";
import { CheckoutButton } from "@/components/common/CheckoutButton/CheckoutButton";
import { CartSummaryPanelUI } from "./CartSummaryPanelUI";

type CartSummaryPanelProps = {
  summary: CartSummary;
};

export function CartSummaryPanel(props: CartSummaryPanelProps) {
  // === PROPS ===
  const { summary } = props;

  return (
    <CartSummaryPanelUI
      summary={summary}
      checkoutButton={<CheckoutButton className="w-full" />}
    />
  );
}

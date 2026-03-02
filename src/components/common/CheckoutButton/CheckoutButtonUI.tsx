import { Button } from "@/components/ui";

type CheckoutButtonUIProps = {
  isLoading: boolean;
  className?: string;
  onClick: () => void;
};

export function CheckoutButtonUI(props: CheckoutButtonUIProps) {
  // === PROPS ===
  const { isLoading, className = "", onClick } = props;

  return (
    <Button
      isLoading={isLoading}
      variant="dark"
      onClick={onClick}
      className={className}
      text="Checkout"
    />
  );
}

"use client";

import Button from "@/components/ui/Button";
import { useCartStore, CartItem } from "@/lib/store";

interface AddToCartButtonProps {
  item: CartItem;
  isSold?: boolean;
}

export default function AddToCartButton({ item, isSold }: AddToCartButtonProps) {
  const { items, addItem, removeItem } = useCartStore();
  const isInCart = items.some((i) => i.id === item.id);

  if (isSold) {
    return (
      <Button variant="outline" disabled className="w-full">
        Sold Out
      </Button>
    );
  }

  if (isInCart) {
    return (
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => removeItem(item.id)}
      >
        Remove from Cart
      </Button>
    );
  }

  // When there's no fixed price, the cart UX is "Enquire" not "Buy" —
  // commission flow handles the actual conversation.
  if (!item.price || item.price <= 0) {
    return (
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={() => addItem(item)}
      >
        Add to enquiry · pay as you wish
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      size="lg"
      className="w-full"
      onClick={() => addItem(item)}
    >
      Add to Cart · suggested ₹{item.price.toLocaleString("en-IN")}
    </Button>
  );
}

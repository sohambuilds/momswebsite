"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
  const { items, removeItem, getTotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="section-padding section-y min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-clay-100 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-charcoal-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
        <h1 className="heading-md text-charcoal-800 mb-3">Your cart is empty</h1>
        <p className="body-md mb-8 max-w-sm">
          Looks like you haven&apos;t found your special piece yet. Browse the shop and discover something unique.
        </p>
        <Link href="/shop">
          <Button variant="primary">Browse the Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="section-padding section-y">
      <h1 className="heading-lg text-charcoal-800 mb-4">Your Cart</h1>
      <p className="body-md mb-10">
        {items.length} {items.length === 1 ? "piece" : "pieces"} selected
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 p-4 rounded-2xl bg-white border border-clay-100 hover:border-clay-200 transition-colors"
            >
              <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-clay-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <Link
                    href={`/shop/${item.slug}`}
                    className="font-serif text-lg text-charcoal-800 hover:text-terracotta-500 transition-colors leading-snug"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-charcoal-400 mt-1">One of a kind</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-serif text-lg text-charcoal-800">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-charcoal-400 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white rounded-2xl border border-clay-100 p-8">
            <h2 className="font-serif text-xl text-charcoal-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-400">Subtotal</span>
                <span className="text-charcoal-700">
                  ₹{getTotal().toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-400">Packaging</span>
                <span className="text-sage-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-400">Delivery</span>
                <span className="text-charcoal-400 text-xs">
                  Inside Kolkata · arranged after order
                </span>
              </div>
            </div>

            {/* Shipping notice — confirmed with Soham: Kolkata only for now */}
            <div
              className="mb-6 p-3 rounded-lg"
              style={{
                background: "var(--cream-100)",
                border: "1px solid rgba(58,46,36,0.12)",
                fontFamily: "var(--serif)",
                fontSize: 13,
                lineHeight: 1.5,
                color: "var(--charcoal-700)",
              }}
            >
              Shipping <strong>inside Kolkata only</strong> at present.
              Elsewhere? Use the{" "}
              <Link
                href="/custom-order"
                style={{ color: "var(--terracotta-500)" }}
              >
                custom-order form
              </Link>{" "}
              and we&apos;ll work it out.
            </div>

            <div className="border-t border-clay-100 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-serif text-lg text-charcoal-800">Total</span>
                <span className="font-serif text-xl text-charcoal-800">
                  ₹{getTotal().toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <Button variant="primary" size="lg" className="w-full mb-3">
              Proceed to Checkout
            </Button>

            {/* Payment options — Razorpay (cards/netbanking) + UPI + bank */}
            <p
              className="text-center mt-2"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--charcoal-500)",
              }}
            >
              Razorpay · UPI · Bank transfer
            </p>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-charcoal-400 hover:text-red-500 transition-colors mt-4"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

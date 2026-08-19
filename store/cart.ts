import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  lastAddedAt: number | null;
  addItem: (product: Pick<Product, "id" | "slug" | "name" | "price" | "images" | "available">, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      lastAddedAt: null,
      addItem: (product, quantity) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === product.id,
          );
          let items: CartItem[];
          if (existing) {
            items = state.items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            );
          } else {
            items = [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity,
                available: product.available,
              },
            ];
          }
          return { items, lastAddedAt: Date.now() };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.productId !== productId)
              : state.items.map((item) =>
                  item.productId === productId ? { ...item, quantity } : item,
                ),
        })),
      clear: () => set({ items: [], lastAddedAt: null }),
    }),
    {
      name: "la-cocina-ketty-cart",
    },
  ),
);

export const selectCartCount = (state: CartState): number =>
  state.items.reduce((acc, item) => acc + item.quantity, 0);

export const selectCartSubtotal = (state: CartState): number =>
  state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
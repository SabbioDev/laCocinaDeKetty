export type CategoryId =
  | "ravioles"
  | "sorrentinos"
  | "tallarines"
  | "noquis"
  | "lasagnas"
  | "pastas-rellenas"
  | "combos";

export interface Category {
  id: CategoryId;
  name: string;
  shortDescription: string;
  image: string;
  slug: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  category: CategoryId;
  images: string[];
  weight: string;
  servings: string;
  ingredients: string[];
  available: boolean;
  featured?: boolean;
  badge?: string;
  soldCount: number;
  conservation: string;
  cooking: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  available: boolean;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export type DeliveryMethod = "retiro" | "envio";

export type PaymentMethod = "transferencia" | "efectivo";

export interface CustomerData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface AddressData {
  street: string;
  number: string;
  city: string;
  postalCode: string;
  province: string;
}

export interface CheckoutData {
  customer: CustomerData;
  deliveryMethod: DeliveryMethod;
  address?: AddressData;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  isDemo: boolean;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
}
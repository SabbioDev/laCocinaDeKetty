import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Process } from "@/components/home/Process";
import { CookingTimes } from "@/components/home/CookingTimes";
import { Benefits } from "@/components/home/Benefits";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactPreview } from "@/components/home/ContactPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <AboutPreview />
      <Process />
      <CookingTimes />
      <Benefits />
      <Testimonials />
      <FaqSection />
      <ContactPreview />
    </>
  );
}
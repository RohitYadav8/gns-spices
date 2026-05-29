import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import CategorySection from "./components/CategorySection";
import AboutSection from "./components/AboutProductsSection";
import RecipesSection from "./components/RecipeSection";
import B2BSection from "./components/B2BSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import AboutProductsSection from "./components/AboutProductsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CategorySection />
      <AboutProductsSection />
      <RecipesSection />
      <B2BSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}

import HeroSection from "../components/HeroSection/HeroSection";
import PageSEO from "../components/SEO/PageSEO";

function HomePage() {
  return (
    <main className="home-page">
      <PageSEO
        title="Maaligai"
        description="Explore curated stays, compare nightly rates, inspect interactive hotel maps, and manage your hotel collection with Maaligai."
      />

      <HeroSection />
    </main>
  );
}

export default HomePage;


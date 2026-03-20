import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AccommodationSection from "@/components/AccommodationSection";
import PackagesSection from "@/components/PackagesSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import FoodSection from "@/components/FoodSection";
import TouristPlacesSection from "@/components/TouristPlacesSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import LocationSection from "@/components/LocationSection";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AccommodationSection />
      <PackagesSection />
      <ActivitiesSection />
      <FoodSection />
      <TouristPlacesSection />
      <FacilitiesSection />
      <LocationSection />
      <BookingCTA />
      <Footer />
    </div>
  );
};

export default Index;

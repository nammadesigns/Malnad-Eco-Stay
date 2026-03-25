import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Check } from "lucide-react";
import { localApiService } from "@/services/localApi";

interface PackageItem {
  name: string;
  price: string;
  features: string[];
  best?: boolean;
}

const PackageCard = ({ pkg, delay }: { pkg: PackageItem; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`relative rounded-2xl p-6 transition-all duration-300 hover:shadow-elevated ${
      pkg.best
        ? "bg-forest text-primary-foreground ring-2 ring-gold scale-[1.02]"
        : "glass-card"
    }`}
  >
    {pkg.best && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
        <Star className="w-3 h-3" /> Best Value
      </div>
    )}
    <h4 className={`font-display text-lg font-semibold mb-1 ${pkg.best ? "" : "text-foreground"}`}>{pkg.name}</h4>
    <div className="mb-4">
      <span className={`text-3xl font-bold ${pkg.best ? "" : "text-forest"}`}>{pkg.price}</span>
      <span className={`text-sm ${pkg.best ? "text-primary-foreground/70" : "text-muted-foreground"}`}> / person / day</span>
    </div>
    <ul className="space-y-2">
      {pkg.features.map((f) => (
        <li key={f} className={`flex items-center gap-2 text-sm ${pkg.best ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
          <Check className={`w-4 h-4 shrink-0 ${pkg.best ? "text-gold" : "text-forest"}`} />
          {f}
        </li>
      ))}
    </ul>
    <a
      href="#booking"
      className={`block mt-6 text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
        pkg.best
          ? "bg-gold text-foreground hover:bg-gold/90"
          : "bg-forest/10 text-forest hover:bg-forest/20"
      }`}
    >
      Choose Plan
    </a>
  </motion.div>
);

const PackagesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [pricing, setPricing] = useState({
    packages: { adventure: 2500, romantic: 3500, family: 4500 }
  });

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const data = await localApiService.getPricing();
      if (data) {
        setPricing(data);
      }
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
    }
  };

  const packages: PackageItem[] = [
    {
      name: "Adventure Package",
      price: `₹${pricing.packages.adventure}`,
      features: ["2 Days / 1 Night", "Trekking & Activities", "All Meals", "Guide Included"],
    },
    {
      name: "Romantic Package",
      price: `₹${pricing.packages.romantic}`,
      features: ["2 Days / 1 Night", "Couples Room", "Candlelight Dinner", "Nature Walks"],
      best: true,
    },
    {
      name: "Family Package",
      price: `₹${pricing.packages.family}`,
      features: ["3 Days / 2 Nights", "Family Room", "All Meals", "Kids Activities"],
    },
  ];

  return (
    <section id="packages" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-forest font-medium text-sm uppercase tracking-widest">Pricing</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">Stay Packages</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

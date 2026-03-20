import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Check } from "lucide-react";

interface PackageItem {
  name: string;
  price: string;
  features: string[];
  best?: boolean;
}

const dormPackages: PackageItem[] = [
  { name: "Stay Only", price: "₹999", features: ["Dormitory bed", "WiFi access", "Common area"] },
  { name: "Stay + Breakfast", price: "₹1,399", features: ["Dormitory bed", "Daily breakfast", "WiFi access"] },
  { name: "Stay + Breakfast + Dinner", price: "₹1,699", features: ["Dormitory bed", "Breakfast", "Dinner", "WiFi"], best: true },
  { name: "Stay + All Meals", price: "₹1,999", features: ["Dormitory bed", "Breakfast, Lunch & Dinner", "WiFi"] },
];

const roomPackages: PackageItem[] = [
  { name: "Stay Only", price: "₹1,299", features: ["Private room", "WiFi access", "Nature view"] },
  { name: "Stay + Breakfast", price: "₹1,499", features: ["Private room", "Daily breakfast", "WiFi access"] },
  { name: "Stay + Breakfast + Dinner", price: "₹1,799", features: ["Private room", "Breakfast", "Dinner", "WiFi"], best: true },
  { name: "Stay + All Meals", price: "₹2,199", features: ["Private room", "All meals included", "WiFi"] },
];

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

        {/* Dormitory */}
        <h3 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">Dormitory Packages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {dormPackages.map((pkg, i) => (
            <PackageCard key={pkg.name + "dorm"} pkg={pkg} delay={i * 0.1} />
          ))}
        </div>

        {/* Room */}
        <h3 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">Room Packages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roomPackages.map((pkg, i) => (
            <PackageCard key={pkg.name + "room"} pkg={pkg} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

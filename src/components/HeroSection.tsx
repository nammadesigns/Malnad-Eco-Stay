import { motion } from "framer-motion";
import { MapPin, Mountain, Leaf } from "lucide-react";
import heroBg from "@/assets/herosection.jpeg";

const highlights = [
  { icon: MapPin, text: "2km from city" },
  { icon: Mountain, text: "Near top tourist places" },
  { icon: Leaf, text: "Eco-friendly stay" },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Malnad Eco Stay surrounded by lush Western Ghats greenery"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 bg-forest/20 backdrop-blur-sm border border-forest/30 text-cream px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" /> Chikkamagaluru, Karnataka
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-cream leading-tight mb-6"
        >
          Malnad <span className="text-gold">Eco Stay</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-10 font-body"
        >
          Experience Nature, Comfort &amp; Adventure in the Heart of Malnad
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <a
            href="#booking"
            className="bg-forest text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-forest-light transition-all duration-300 hover:shadow-elevated"
          >
            Book Your Stay
          </a>
          <a
            href="#activities"
            className="bg-cream/10 backdrop-blur-sm border border-cream/30 text-cream px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-cream/20 transition-all duration-300"
          >
            Explore Activities
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {highlights.map((h) => (
            <div key={h.text} className="flex items-center gap-2 text-cream/70 text-sm">
              <h.icon className="w-4 h-4 text-gold" />
              <span>{h.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;

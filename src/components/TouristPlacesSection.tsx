import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import mullayanagiriImg from "@/assets/mullayanagiri.jpg";
import jhariFallsImg from "@/assets/jhari-falls.jpg";
import hirekolaleImg from "@/assets/hirekolale-lake.jpg";

const places = [
  { name: "Mullayanagiri", image: mullayanagiriImg },
  { name: "Baba Budangiri", image: mullayanagiriImg },
  { name: "Jhari Falls", image: jhariFallsImg },
  { name: "Hebbe Falls", image: jhariFallsImg },
  { name: "Seethalayangiri", image: mullayanagiriImg },
  { name: "Z Point", image: mullayanagiriImg },
  { name: "Hirekolale Lake", image: hirekolaleImg },
  { name: "Bandekal Gudda", image: mullayanagiriImg },
  { name: "Muthodi Forest", image: hirekolaleImg },
  { name: "Ukkada Falls", image: jhariFallsImg },
];

const TouristPlacesSection = () => {
  return (
    <section id="places" className="section-padding bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-forest font-medium text-sm uppercase tracking-widest">Explore</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">Nearby Tourist Places</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {places.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[3/4]"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className="text-cream text-sm font-semibold truncate">{p.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TouristPlacesSection;

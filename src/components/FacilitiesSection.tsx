import { motion } from "framer-motion";
import { Shield, Zap, Wifi, Gamepad2, TreePine, MapPin } from "lucide-react";

const facilities = [
  { icon: Shield, name: "24x7 CCTV Security" },
  { icon: Zap, name: "Full Day Power Supply" },
  { icon: Wifi, name: "Free WiFi" },
  { icon: Gamepad2, name: "Games & Activities" },
  { icon: TreePine, name: "Nature View" },
  { icon: MapPin, name: "Near City Location" },
];

const FacilitiesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-forest font-medium text-sm uppercase tracking-widest">Amenities</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">Our Facilities</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {facilities.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-xl p-6 flex flex-col items-center gap-3 text-center"
            >
              <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center">
                <f.icon className="w-6 h-6 text-forest" />
              </div>
              <span className="text-xs font-semibold text-foreground">{f.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;

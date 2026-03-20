import { motion } from "framer-motion";
import { UtensilsCrossed, Leaf } from "lucide-react";
import breakfastImg from "@/assets/food-breakfast.jpg";
import dinnerImg from "@/assets/food-dinner.jpg";

const FoodSection = () => {
  return (
    <section id="food" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-forest font-medium text-sm uppercase tracking-widest">Dining</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">Food Experience</h2>
          <p className="text-muted-foreground mt-3 flex items-center justify-center gap-2">
            <Leaf className="w-4 h-4 text-forest" />
            Veg &amp; Non-Veg options available
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Breakfast */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-strong rounded-2xl overflow-hidden"
          >
            <div className="h-56 overflow-hidden">
              <img src={breakfastImg} alt="South Indian breakfast spread" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="w-5 h-5 text-gold" />
                <h3 className="font-display text-xl font-semibold text-foreground">Breakfast Menu</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Idli (4 pieces)</li>
                <li>• Pulav</li>
                <li>• Poori (2 pieces)</li>
                <li>• Lemon Rice</li>
              </ul>
            </div>
          </motion.div>

          {/* Dinner */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-strong rounded-2xl overflow-hidden"
          >
            <div className="h-56 overflow-hidden">
              <img src={dinnerImg} alt="Indian dinner spread with biryani and curry" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="w-5 h-5 text-gold" />
                <h3 className="font-display text-xl font-semibold text-foreground">Dinner Menu</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Biryani &amp; Kebab</li>
                <li>• Roti</li>
                <li>• Veg / Non-Veg Curry</li>
                <li>• Veg Sambar &amp; Rice</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FoodSection;

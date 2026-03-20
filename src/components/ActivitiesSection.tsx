import { motion } from "framer-motion";
import {
  Flame, Trophy, CircleDot, Swords, Dices, Target, Gamepad2, Volleyball, Sparkles, Layers
} from "lucide-react";

const activities = [
  { name: "Carrom", icon: Layers },
  { name: "Cricket", icon: Trophy },
  { name: "Volleyball", icon: Volleyball },
  { name: "Badminton", icon: Target },
  { name: "Chess", icon: Swords },
  { name: "Pagade", icon: Dices },
  { name: "Lagoori", icon: CircleDot },
  { name: "Golli", icon: Sparkles },
  { name: "Camp Fire", icon: Flame },
  { name: "UNO", icon: Gamepad2 },
];

const ActivitiesSection = () => {
  return (
    <section id="activities" className="section-padding bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-forest font-medium text-sm uppercase tracking-widest">Fun & Games</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">Activities</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {activities.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.08, y: -5 }}
              className="glass-card-strong rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center group-hover:bg-forest group-hover:text-primary-foreground transition-all duration-300">
                <a.icon className="w-7 h-7 text-forest group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="text-sm font-semibold text-foreground">{a.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;

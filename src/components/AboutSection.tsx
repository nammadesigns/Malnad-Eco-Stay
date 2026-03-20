import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TreePine, Heart, Users } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-forest font-medium text-sm uppercase tracking-widest">Welcome</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">
            About Malnad Eco Stay
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl leading-relaxed text-center max-w-4xl mx-auto mb-14"
        >
          Malnad Eco Stay is a peaceful nature retreat located near Chikkamagaluru, just 2 km from the city.
          Surrounded by lush greenery and close to famous tourist destinations, it offers the perfect balance
          of comfort, adventure, and relaxation. Ideal for couples, families, and groups looking to experience
          the beauty of the Western Ghats.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Heart, title: "Couples Retreat", desc: "Romantic getaways with private rooms and serene views" },
            { icon: Users, title: "Family Friendly", desc: "Spacious rooms and activities for the whole family" },
            { icon: TreePine, title: "Eco Friendly", desc: "Sustainable practices that preserve nature's beauty" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="glass-card rounded-xl p-8 text-center hover:shadow-elevated transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-forest/20 transition-colors">
                <item.icon className="w-7 h-7 text-forest" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

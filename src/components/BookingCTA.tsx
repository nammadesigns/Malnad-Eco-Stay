import { motion } from "framer-motion";
import { Phone, Calendar } from "lucide-react";
import campfireImg from "@/assets/campfire.jpg";

const BookingCTA = () => {
  return (
    <section id="booking" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={campfireImg} alt="Campfire evening at Malnad Eco Stay" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream mb-4">
            Plan Your Perfect Getaway
          </h2>
          <p className="text-cream/70 text-lg mb-10">
            at Malnad Eco Stay — where nature meets comfort
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#booking"
              className="bg-gold text-foreground px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 hover:bg-gold/90 transition-colors"
            >
              <Calendar className="w-5 h-5" /> Book Now
            </a>
            <a
              href="tel:+919876543210"
              className="bg-cream/10 backdrop-blur-sm border border-cream/30 text-cream px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 hover:bg-cream/20 transition-colors"
            >
              <Phone className="w-5 h-5" /> Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCTA;

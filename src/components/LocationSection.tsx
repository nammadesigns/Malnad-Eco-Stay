import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-forest font-medium text-sm uppercase tracking-widest">Find Us</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">Our Location</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-elevated h-80 lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d807!2d75.731731!3d13.3433277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbad86b5344f8ff%3A0x9bffcab9ffce611f!2sMalnadEcoStay!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 320 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Malnad Eco Stay Location"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-strong rounded-2xl p-8 flex flex-col justify-center gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-forest" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">2km from City</h3>
                <p className="text-muted-foreground text-sm mt-1">Close to Chikkamagaluru town center with easy access to all amenities</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center shrink-0">
                <Navigation className="w-6 h-6 text-forest" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Easy Access</h3>
                <p className="text-muted-foreground text-sm mt-1">Well-connected to all major tourist attractions in Chikkamagaluru</p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/1nZ8hnVdorxR97GS9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-forest text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm text-center hover:bg-forest-light transition-colors mt-2"
            >
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

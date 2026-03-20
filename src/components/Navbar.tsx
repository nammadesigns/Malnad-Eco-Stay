import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Packages", href: "#packages" },
  { label: "Activities", href: "#activities" },
  { label: "Food", href: "#food" },
  { label: "Places", href: "#places" },
  { label: "Contact", href: "#booking" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#hero" className="flex items-center gap-2">
          <Leaf className={`w-7 h-7 ${scrolled ? "text-forest" : "text-cream"}`} />
          <span className={`font-display text-lg md:text-xl font-bold ${scrolled ? "text-foreground" : "text-cream"}`}>
            Malnad <span className={scrolled ? "text-forest" : "text-gold"}>Eco Stay</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? "text-muted-foreground hover:text-forest" : "text-cream/90 hover:text-gold"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="bg-forest text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-forest-light transition-colors"
          >
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-cream"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-forest py-2"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="bg-forest text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold text-center"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

import { Leaf, Instagram, Facebook, Mail } from "lucide-react";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Rooms", href: "#rooms" },
  { label: "Packages", href: "#packages" },
  { label: "Activities", href: "#activities" },
  { label: "Contact", href: "#booking" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-cream/80 py-14 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-forest-light" />
            <span className="font-display text-xl font-bold text-cream">Malnad Eco Stay</span>
          </div>
          <p className="text-sm text-cream/60">
            Chikkamagaluru, Karnataka<br />
            A peaceful eco retreat in the Western Ghats
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold text-cream mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-cream/60 hover:text-gold transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-display text-lg font-semibold text-cream mb-4">Connect With Us</h4>
          <div className="flex gap-4">
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 bg-cream/10 rounded-lg flex items-center justify-center hover:bg-forest transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-cream/10 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Malnad Eco Stay. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

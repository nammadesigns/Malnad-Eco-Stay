import { Leaf, Instagram, Facebook, Mail, Phone, MapPin, Clock } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/#rooms" },
  { label: "Packages", href: "/#packages" },
  { label: "Activities", href: "/#activities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#booking" },
];

const socials = [
  { Icon: Instagram, href: "https://www.instagram.com/malnadecostay/", label: "Instagram" },
  { Icon: Facebook, href: "https://www.facebook.com/malnadecostay/", label: "Facebook" },
  { Icon: Mail, href: "mailto:malnadecostay@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-cream/80 py-14 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-forest-light" />
            <span className="font-display text-xl font-bold text-cream">Malnad Eco Stay</span>
          </div>
          <p className="text-sm text-cream/60 leading-relaxed mb-5">
            Nestled in the misty hills of Chikkamagaluru, we offer an authentic eco retreat experience surrounded by coffee estates and the lush Western Ghats.
          </p>
          <div className="flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-cream/10 rounded-lg flex items-center justify-center hover:bg-forest transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
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

        {/* Contact Info */}
        <div>
          <h4 className="font-display text-lg font-semibold text-cream mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-forest-light mt-0.5 shrink-0" />
              <span className="text-sm text-cream/60">Malnad Eco Stay, Chikkamagaluru, Karnataka — 577101</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-forest-light shrink-0" />
              <a href="tel:+919380566589" className="text-sm text-cream/60 hover:text-gold transition-colors">+91 93805 66589</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-forest-light shrink-0" />
              <a href="mailto:malnadecostay@gmail.com" className="text-sm text-cream/60 hover:text-gold transition-colors">malnadecostay@gmail.com</a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-forest-light mt-0.5 shrink-0" />
              <span className="text-sm text-cream/60">Check-in: 12:00 PM<br />Check-out: 11:00 AM</span>
            </li>
          </ul>
        </div>

        {/* Visit Info */}
        <div>
          <h4 className="font-display text-lg font-semibold text-cream mb-4">Plan Your Visit</h4>
          <p className="text-sm text-cream/60 leading-relaxed mb-4">
            Best time to visit is October to February for pleasant weather and lush greenery. Monsoon season (June–September) offers a magical misty experience.
          </p>
          <a
            href="https://maps.app.goo.gl/1nZ8hnVdorxR97GS9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold/80 transition-colors font-medium"
          >
            <MapPin className="w-4 h-4" /> Get Directions →
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/40">
        <span>© {new Date().getFullYear()} Malnad Eco Stay. All rights reserved.</span>
        <span>
          Designed & Developed by{" "}
          <a
            href="https://namma-designs.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold/70 hover:text-gold transition-colors font-bold"
          >
            Namma Designs
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

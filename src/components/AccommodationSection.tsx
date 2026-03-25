import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, Users, Home } from "lucide-react";
import couplesImg from "@/assets/couples-room.jpg";
import dormitoryImg from "@/assets/dormitory.jpg";
import familyImg from "@/assets/family-room.jpg";
import { localApiService } from "@/services/localApi";

const AccommodationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [pricing, setPricing] = useState({
    rooms: { dormitory: 800, couples: 1500, family: 2500 }
  });

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const data = await localApiService.getPricing();
      if (data) {
        setPricing(data);
      }
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
    }
  };

  const rooms = [
    {
      title: "Couples Rooms",
      desc: "3 cozy rooms designed for a romantic getaway with nature views",
      detail: "3 Rooms Available",
      price: pricing.rooms.couples,
      icon: Heart,
      image: couplesImg,
    },
    {
      title: "Dormitory",
      desc: "Perfect for groups and backpackers, shared space with all amenities",
      detail: "Capacity: 9 People",
      price: pricing.rooms.dormitory,
      icon: Users,
      image: dormitoryImg,
    },
    {
      title: "Family Room",
      desc: "Spacious room ideal for families wanting comfort and togetherness",
      detail: "1 Room Available",
      price: pricing.rooms.family,
      icon: Home,
      image: familyImg,
    },
  ];

  return (
    <section id="rooms" className="section-padding bg-cream">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-forest font-medium text-sm uppercase tracking-widest">Accommodation</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">
            Choose Your Stay
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card-strong rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-forest/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                  {room.detail}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center">
                    <room.icon className="w-5 h-5 text-forest" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{room.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{room.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-forest">₹{room.price}</span>
                  <span className="text-sm text-muted-foreground">per night</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;

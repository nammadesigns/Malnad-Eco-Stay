import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { localApiService } from '@/services/localApi';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const galleryImages = await localApiService.getGallery();
      const imageUrls = galleryImages.map(filename => `/gallery/${filename}`);
      setImages(imageUrls);
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      // Fallback to static images if API fails
      setImages(getStaticImages());
    } finally {
      setLoading(false);
    }
  };

  const getStaticImages = () => {
    const imageNames = [
      'WhatsApp Image 2026-03-20 at 12.31.22 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.24 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.24 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.26 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.26 PM (2).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.26 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.27 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.28 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.28 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.29 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.30 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.31 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.31 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.32 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.32 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.34 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.36 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.38 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.39 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.39 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.40 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.40 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.41 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.41 PM (2).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.41 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.42 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.43 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.43 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.44 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.44 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.51 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.55 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.55 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.56 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.56 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.57 PM (1).jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.57 PM.jpeg',
      'WhatsApp Image 2026-03-20 at 12.31.58 PM.jpeg'
    ];
    return imageNames.map(name => `/gallery/${name}`);
  };

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-forest to-forest-light flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/gallery/WhatsApp Image 2026-03-20 at 12.31.27 PM.jpeg')`
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Gallery
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 max-w-2xl mx-auto drop-shadow-md">
            Discover the natural beauty and serene moments at Malnad Eco Stay
          </p>
          <div className="mt-8 text-cream/80">
            <p className="text-lg drop-shadow-md">{images.length} Beautiful Moments Captured</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div>
              <p className="mt-4 text-gray-600">Loading gallery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden group">
                      <CardContent className="p-0">
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-0 bg-black">
                    <div className="relative">
                      <div className="embla overflow-hidden" ref={emblaRef}>
                        <div className="embla__container flex">
                          {images.map((img, idx) => (
                            <div key={idx} className="embla__slide flex-none w-full">
                              <img
                                src={img}
                                alt={`Gallery image ${idx + 1}`}
                                className="w-full h-auto max-h-[80vh] object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                        onClick={scrollPrev}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                        onClick={scrollNext}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
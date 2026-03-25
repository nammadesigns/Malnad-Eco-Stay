import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { localApiService } from '@/services/localApi';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const cld = new Cloudinary({ cloud: { cloudName: 'dkusa47qe' } });

const isCloudinaryId = (filename: string) => filename.includes('/') || !filename.includes('.');

const getImageUrl = (filename: string) =>
  isCloudinaryId(filename)
    ? `https://res.cloudinary.com/dkusa47qe/image/upload/${filename}`
    : `/gallery/${filename}`;

const GalleryImage = ({ filename, className }: { filename: string; className?: string }) => {
  if (isCloudinaryId(filename)) {
    const img = cld.image(filename).format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(600).height(400));
    return <AdvancedImage cldImg={img} style={{ width: '100%', height: '256px', objectFit: 'cover' }} className={className} />;
  }
  return <img src={`/gallery/${filename}`} alt="" className={className} loading="lazy" />;
};

const STATIC_IMAGES = [
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
  'WhatsApp Image 2026-03-20 at 12.31.58 PM.jpeg',
];

const Gallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (open && emblaApi) {
      emblaApi.scrollTo(startIndex, true);
    }
  }, [open, emblaApi]);

  useEffect(() => {
    localApiService.getGallery()
      .then(imgs => setImages(imgs))
      .catch(() => setImages(STATIC_IMAGES))
      .finally(() => setLoading(false));
  }, []);

  const openImage = (index: number) => {
    setStartIndex(index);
    setOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-[60vh] bg-gradient-to-br from-forest to-forest-light flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/gallery/WhatsApp Image 2026-03-20 at 12.31.27 PM.jpeg')` }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">Gallery</h1>
          <p className="text-xl md:text-2xl text-cream/90 max-w-2xl mx-auto drop-shadow-md">Discover the natural beauty and serene moments at Malnad Eco Stay</p>
          <p className="mt-8 text-lg text-cream/80 drop-shadow-md">{images.length} Beautiful Moments Captured</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </section>

      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest" />
              <p className="mt-4 text-gray-600">Loading gallery...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden group" onClick={() => openImage(index)}>
                    <CardContent className="p-0 h-64">
                      <GalleryImage filename={image} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl w-full p-0 bg-black">
                  <div className="relative">
                    <div className="embla overflow-hidden" ref={emblaRef}>
                      <div className="embla__container flex">
                        {images.map((img, idx) => (
                          <div key={idx} className="embla__slide flex-none w-full">
                            <img src={getImageUrl(img)} alt={`Gallery image ${idx + 1}`} className="w-full h-auto max-h-[80vh] object-contain" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={() => emblaApi?.scrollPrev()}>
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={() => emblaApi?.scrollNext()}>
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;

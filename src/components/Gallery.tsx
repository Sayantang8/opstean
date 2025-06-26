
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GalleryItem {
  image: string;
  caption: string;
}

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const galleryItems: GalleryItem[] = [
    {
      image: "https://images.unsplash.com/photo-1581093196277-9f6e9b8fbb09?w=500&auto=format&fit=crop&q=80",
      caption: "Our Research Lab"
    },
    {
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format&fit=crop&q=80",
      caption: "Quality Control Testing"
    },
    {
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&auto=format&fit=crop&q=80",
      caption: "Manufacturing Facility"
    },
    {
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&auto=format&fit=crop&q=80",
      caption: "Team Collaboration"
    },
    {
      image: "https://images.unsplash.com/photo-1583911860215-4324764b5593?w=500&auto=format&fit=crop&q=80",
      caption: "Pill Manufacturing"
    },
    {
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&auto=format&fit=crop&q=80",
      caption: "Packaging Process"
    }
  ];
  
  // Define gallery layout columns for masonry effect
  const galleryColumns = [
    galleryItems.filter((_, i) => i % 3 === 0),
    galleryItems.filter((_, i) => i % 3 === 1),
    galleryItems.filter((_, i) => i % 3 === 2)
  ];
  
  return (
    <section id="gallery" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-navy text-center mb-12 fade-in-section">Our Gallery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6">
              {column.map((item, itemIndex) => {
                const index = colIndex * 2 + itemIndex;
                return (
                  <div 
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-md fade-in-section"
                    style={{ animationDelay: `${0.1 * index}s` }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.caption}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-500",
                        hoveredItem === index ? "scale-110" : "scale-100"
                      )}
                    />
                    <div 
                      className={cn(
                        "absolute inset-0 bg-navy bg-opacity-70 flex items-center justify-center transition-opacity duration-300",
                        hoveredItem === index ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <p className="text-white text-lg font-medium">{item.caption}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

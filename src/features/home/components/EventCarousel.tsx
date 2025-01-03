"use client"

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Types
interface ImageType {
  src: string;
  alt: string;
}

// Data
const carouselImages: ImageType[] = [
  {
    src: "/images/event-music.jpg",
    alt: "Music Event"
  },
  {
    src: "/images/festival-musik.webp",
    alt: "Music Festival"
  },
  {
    src: "/images/indie-fest.webp",
    alt: "Indie Festival"
  },
  {
    src: "/images/concert.jpg",
    alt: "Concert"
  },
  {
    src: "/images/even-discount.jpg",
    alt: "Event Discount"
  }
];

const EventCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  return (
    <section className="mt-2 sm:mt-4 px-2 sm:px-4">
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="p-0">
          <div className="relative overflow-hidden">
            {/* Carousel Content */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {carouselImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <div className="relative h-[200px] sm:h-[300px] md:h-[350px] w-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full rounded-lg sm:rounded-xl object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-2 sm:left-4 top-1/2 z-30 -translate-y-1/2 bg-white/90 p-1.5 sm:p-2 rounded-full shadow-lg cursor-pointer hover:bg-white transition-colors"
              onClick={handlePrevious}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              className="absolute right-2 sm:right-4 top-1/2 z-30 -translate-y-1/2 bg-white/90 p-1.5 sm:p-2 rounded-full shadow-lg cursor-pointer hover:bg-white transition-colors"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-4">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all ${
              activeIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default EventCarousel;
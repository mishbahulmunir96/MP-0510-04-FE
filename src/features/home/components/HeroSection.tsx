"use client";

import { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const HeroSection = () => {
  const images = [
    "/images/event-music.jpg",
    "/images/festival-musik.webp",
    "/images/indie-fest.webp",
    "/images/concert.jpg",
    "/images/even-discount.jpg",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section>
      <div className="flex items-center justify-center h-full">
        <div className="w-full">
          <Carousel>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className={index === activeIndex ? "block" : "hidden"}
              >
                <div className="p-2">
                  <CardContent className="flex items-center justify-center p-4">
                    <div className="h-[300px] w-full relative">
                      <Image
                        src={image}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="rounded-md object-fill"
                      />
                    </div>
                  </CardContent>
                </div>
              </CarouselItem>
            ))}
            <CarouselPrevious
              className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-gray-800 p-3 text-white hover:bg-gray-700"
              onClick={() =>
                setActiveIndex((activeIndex - 1 + images.length) % images.length)
              }
            />
            <CarouselNext
              className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-gray-800 p-3 text-white hover:bg-gray-700"
              onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
            />
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  activeIndex === index ? "bg-gray-800" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

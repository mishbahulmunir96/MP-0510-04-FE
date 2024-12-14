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
    "/images/event-hero-section.jpg",
    "/images/festival-musik.webp",
    "/images/indie-fest.webp",
    "/images/konser-musik.webp",
    "/images/dwp.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="pt-4">
      <Carousel>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className={index === activeIndex ? "block" : "hidden"}
          >
            <div className="p-1">
              <CardContent className="flex items-center justify-center p-6">
                <div className="h-[300px] w-full">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="p-4"
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

      <div className="absolute top-85 left-1/2 flex -translate-x-1/2 transform gap-2">
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
    </section>
  );
};

export default HeroSection;

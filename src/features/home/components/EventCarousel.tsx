"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

const EventCarousel = () => {
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

  const handlePrevious = () => {
    console.log("Previous button clicked");
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    console.log("Next button clicked");
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <section className="mt-4 px-4">
      <Card className="w-full">
        <CardContent className="p-0">
          <Carousel className="relative overflow-hidden">
            <CarouselContent
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <CarouselItem key={index} className="flex-shrink-0 w-full">
                  <div className="relative h-[350px] w-full">
                    <Image
                      src={image}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <button
              className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer"
              onClick={handlePrevious}
            >
              &#9664;
            </button>
            <button
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer"
              onClick={handleNext}
            >
              &#9654;
            </button>
          </Carousel>
        </CardContent>
      </Card>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              activeIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default EventCarousel;

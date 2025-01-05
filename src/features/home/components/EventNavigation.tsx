"use client"

import { cn } from "@/lib/utils";
import { Mic, PartyPopper, Theater, Calendar, Heart, Gamepad2, Presentation, Coffee } from 'lucide-react';
import { useState } from "react";

interface CategoryItem {
  icon: React.ReactNode;
  label: string;
  description: string;
  active?: boolean;
}

const categories: CategoryItem[] = [
  { 
    icon: <Mic className="h-5 w-5 sm:h-6 sm:w-6" />, 
    label: "Music",
    description: "Concerts, festivals, and live performances" 
  },
  { 
    icon: <PartyPopper className="h-5 w-5 sm:h-6 sm:w-6" />, 
    label: "Nightlife",
    description: "Clubs, bars, and night events" 
  },
  { 
    icon: <Theater className="h-5 w-5 sm:h-6 sm:w-6" />, 
    label: "Performing",
    description: "Theater, dance, and visual arts" 
  },
  { 
    icon: <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />, 
    label: "Holidays",
    description: "Special occasions and celebrations" 
  },
  { 
    icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6" />, 
    label: "Dating",
    description: "Singles events and meetups" 
  },
  { 
    icon: <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6" />, 
    label: "Hobbies",
    description: "Gaming, crafts, and leisure activities" 
  },
  { 
    icon: <Presentation className="h-5 w-5 sm:h-6 sm:w-6" />, 
    label: "Business",
    description: "Networking and professional events" 
  },
  { 
    icon: <Coffee className="h-5 w-5 sm:h-6 sm:w-6" />, 
    label: "Food & Drink",
    description: "Culinary experiences and tastings" 
  },
];

export function EventsNavigation() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="space-y-4 sm:space-y-8 my-4 sm:my-6">
      <div className="px-2 sm:px-4">
        <div className="w-full rounded-xl overflow-x-auto">
          <div className="flex gap-2 sm:gap-4 md:gap-6 min-w-max px-2 justify-start sm:justify-center py-4">
            {categories.map((category) => {
              const isActive = activeCategory === category.label;
              
              return (
                <button
                  key={category.label}
                  onClick={() => setActiveCategory(category.label)}
                  className="group flex flex-col items-center gap-2 sm:gap-3 min-w-[80px] sm:min-w-[100px] transition-all duration-300"
                >
                  <div
                    className={cn(
                      "relative flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-xl sm:rounded-2xl",
                      "transition-all duration-300 hover:scale-105",
                      "bg-gradient-to-br from-purple-500 to-blue-500",
                      "border-2 shadow-sm",
                      isActive 
                        ? "border-white shadow-purple-300" 
                        : "border-transparent hover:border-white hover:shadow-md"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-all duration-300",
                        isActive
                          ? "text-white scale-110"
                          : "text-purple-100 group-hover:text-white"
                      )}
                    >
                      {category.icon}
                    </div>
                    
                    {/* Hover tooltip - Hidden on mobile */}
                    <div className="hidden sm:block absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-white text-purple-800 text-xs rounded-lg py-2 px-3 shadow-lg">
                        {category.description}
                      </div>
                    </div>
                  </div>
                  
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-medium text-center transition-colors duration-300",
                      isActive
                        ? "text-purple-600"
                        : "text-gray-600 group-hover:text-purple-800"
                    )}
                  >
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


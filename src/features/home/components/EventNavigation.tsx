"use client"

import { cn } from "@/lib/utils";
import {
  Mic,
  PartyPopper,
  Theater,
  Calendar,
  Heart,
  Gamepad2,
  Presentation,
  Coffee,
} from "lucide-react";
import { useState } from "react";

interface CategoryItem {
  icon: React.ReactNode;
  label: string;
  description: string;
  active?: boolean;
}

const categories: CategoryItem[] = [
  { 
    icon: <Mic className="h-6 w-6" />, 
    label: "Music",
    description: "Concerts, festivals, and live performances" 
  },
  { 
    icon: <PartyPopper className="h-6 w-6" />, 
    label: "Nightlife",
    description: "Clubs, bars, and night events" 
  },
  { 
    icon: <Theater className="h-6 w-6" />, 
    label: "Performing",
    description: "Theater, dance, and visual arts" 
  },
  { 
    icon: <Calendar className="h-6 w-6" />, 
    label: "Holidays",
    description: "Special occasions and celebrations" 
  },
  { 
    icon: <Heart className="h-6 w-6" />, 
    label: "Dating",
    description: "Singles events and meetups" 
  },
  { 
    icon: <Gamepad2 className="h-6 w-6" />, 
    label: "Hobbies",
    description: "Gaming, crafts, and leisure activities" 
  },
  { 
    icon: <Presentation className="h-6 w-6" />, 
    label: "Business",
    description: "Networking and professional events" 
  },
  { 
    icon: <Coffee className="h-6 w-6" />, 
    label: "Food & Drink",
    description: "Culinary experiences and tastings" 
  },
];

export function EventsNavigation() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="space-y-8 my-8">
      <div className="px-4">
        
        <div className="w-full rounded-xl">
          <div className="flex gap-4 pb-4 md:gap-6 min-w-max px-2 justify-center">
            {categories.map((category) => {
              const isActive = activeCategory === category.label;
              
              return (
                <button
                  key={category.label}
                  onClick={() => setActiveCategory(category.label)}
                  className="group flex flex-col items-center gap-3 min-w-[100px] transition-all duration-300"
                >
                  <div
                    className={cn(
                      "relative flex h-24 w-24 items-center justify-center rounded-2xl",
                      "transition-all duration-300 hover:scale-105",
                      "bg-gradient-to-br from-white to-gray-50",
                      "border-2 shadow-sm",
                      isActive 
                        ? "border-blue-500 shadow-blue-100" 
                        : "border-gray-100 hover:border-blue-200 hover:shadow-md"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-all duration-300",
                        isActive
                          ? "text-blue-500 scale-110"
                          : "text-gray-500 group-hover:text-blue-400"
                      )}
                    >
                      {category.icon}
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3">
                        {category.description}
                      </div>
                    </div>
                  </div>
                  
                  <span
                    className={cn(
                      "text-sm font-medium text-center transition-colors duration-300",
                      isActive
                        ? "text-blue-500"
                        : "text-gray-600 group-hover:text-gray-900"
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

export default EventsNavigation;
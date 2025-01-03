"use client";

import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import EventList from "../home/components/EventList";
import { motion } from "framer-motion";

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Explore Events
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing events happening around you
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto mb-12 shadow-lg">
            <CardContent className="py-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for events..."
                  className="w-full pl-12 py-6 text-lg focus-visible:ring-blue-500 transition-shadow duration-300 ease-in-out"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.section 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <EventList searchQuery={debouncedQuery} />
        </motion.section>
      </div>
    </main>
  );
};

export default ExplorePage;


"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import EventList from "../home/components/EventList";

interface FilteredEventListProps {
  searchQuery: string;
}

const FilteredEventList: React.FC<FilteredEventListProps> = ({ searchQuery }) => {
  return <div>{searchQuery}</div>;
};

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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center tracking-tight">
            All Events
          </h1>
        </header>

        <Card className="max-w-lg mx-auto mb-12">
          <CardContent className="py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for events..."
                className="w-full pl-10 py-3 focus-visible:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <section className="max-w-7xl mx-auto">
          <FilteredEventList searchQuery={debouncedQuery} />
          <EventList />
        </section>
      </div>
    </main>
  );
};

export default ExplorePage;

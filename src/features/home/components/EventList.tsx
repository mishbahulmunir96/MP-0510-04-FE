"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileMinus2, Loader2, Filter } from 'lucide-react';
import PaginationSection from "@/components/PaginationSection";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import EventCard from "@/features/event/compoents/EventCard";

interface EventListProps {
  searchQuery?: string;
  category?: string;
  address?: string;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "music", label: "Music" },
  { value: "sport", label: "Sport" },
  { value: "nightLife", label: "NightLife" },
];

const addresses = [
  { value: "all", label: "All Locations" },
  { value: "jakarta", label: "Jakarta" },
  { value: "bandung", label: "Bandung" },
  { value: "yogyakarta", label: "Yogyakarta" },
  { value: "surabaya", label: "Surabaya" },
];

const EventList = ({ searchQuery, category, address }: EventListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(category);
  const [selectedAddress, setSelectedLocation] = useState<string | undefined>(address);
  const [page, setPage] = useState<number>(1);
  const [take, setTake] = useState<number>(4);
  const { data, isPending } = useGetEvents({ page, take, searchQuery, category: selectedCategory, address: selectedAddress });

  useEffect(() => {
  }, [data, searchQuery, selectedCategory, selectedAddress]);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value === "all" ? undefined : event.target.value);
    setPage(1);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value === "all" ? undefined : event.target.value);
    setPage(1);
  };

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!data || !data.data || !data.meta) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h1 className="text-3xl font-bold text-purple-600">No events available</h1>
      </div>
    );
  }

  const filteredEvents = data.data.filter((event) =>
    event.title.toLowerCase().includes(searchQuery?.toLowerCase() || "") &&
    (!selectedCategory || selectedCategory === "all" || event.category === selectedCategory) &&
    (!selectedAddress || selectedAddress === "all" || event.address.toLowerCase() === selectedAddress.toLowerCase())
  );

  return (
    <section className="flex flex-col px-4 w-full mx-auto py-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-0">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col md:flex-row md:space-x-4 bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="relative">
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out appearance-none bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <div className="relative">
            <select
              id="address"
              value={selectedAddress}
              onChange={handleAddressChange}
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out appearance-none bg-white"
            >
              {addresses.map((addr) => (
                <option key={addr.value} value={addr.value}>
                  {addr.label}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </motion.div>

      {!filteredEvents.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col min-h-[30vh] items-center justify-center space-y-4 bg-white rounded-xl shadow-lg p-8"
        >
          <FileMinus2 className="w-20 h-20 text-purple-400" />
          <h1 className="text-2xl font-bold text-purple-600">No matching events found</h1>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </motion.div>
      ) : (
        <div className="flex flex-col flex-grow">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 mb-4"
          >
            <PaginationSection
              onChangePage={onChangePage}
              page={page}
              take={data.meta.take}
              total={data.meta.total}
            />
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default EventList;


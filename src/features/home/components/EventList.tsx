"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileMinus2, Loader2 } from 'lucide-react';
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
  const { data, isPending } = useGetEvents({ page, searchQuery, category: selectedCategory, address: selectedAddress });

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
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data || !data.data || !data.meta) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">No events available</h1>
      </div>
    );
  }

  const filteredEvents = data.data.filter((event) =>
    event.title.toLowerCase().includes(searchQuery?.toLowerCase() || "") &&
    (!selectedCategory || selectedCategory === "all" || event.category === selectedCategory) &&
    (!selectedAddress || selectedAddress === "all" || event.address.toLowerCase() === selectedAddress.toLowerCase())
  );

  return (
    <section className="px-4 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-1/2">
          
          <select
            id="address"
            value={selectedAddress}
            onChange={handleAddressChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
          >
            {addresses.map((addr) => (
              <option key={addr.value} value={addr.value}>
                {addr.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!filteredEvents.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-[30vh] items-center justify-center space-y-4"
        >
          <FileMinus2 className="w-16 h-16 text-gray-400" />
          <h1 className="text-xl font-semibold text-gray-600">No matching events found</h1>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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

          <div className="mt-12">
            <PaginationSection
              onChangePage={onChangePage}
              page={page}
              take={data.meta.take}
              total={data.meta.total}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default EventList;

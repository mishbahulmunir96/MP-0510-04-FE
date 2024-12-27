"use client";

import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetEvent from "@/hooks/api/event/useGetEvent";
import Image from "next/image";
import { FC } from "react";
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { format } from "date-fns";
import { motion } from "framer-motion";

interface EventDetailProps {
  eventId: number;
}

const EventDetailPage: FC<EventDetailProps> = ({ eventId }) => {
  const { data, isPending } = useGetEvent(eventId);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-600">No data available</h1>
      </div>
    );
  }

  return (
    <main className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={data.thumbnail}
                alt="Event Thumbnail"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="md:sticky md:top-6 shadow-lg">
              <CardContent className="space-y-6 p-6">
                <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-5 w-5 text-blue-500" />
                    <p>
                      {format(new Date(data.startTime), "dd MMM yyyy")} -{" "}
                      {format(new Date(data.endTime), "dd MMM yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-5 w-5 text-blue-500" />
                    <p>
                      {format(new Date(data.startTime), "HH:mm")} -{" "}
                      {format(new Date(data.endTime), "HH:mm")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 text-blue-500" />
                    <p className="line-clamp-1">{data.address}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-bold text-blue-600">Rp.{data.price.toLocaleString()}</p>
                </div>

                <div className="mt-6">
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300" 
                    size="lg"
                  >
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10"
        >
          <div className="lg:col-span-3">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="flex h-16 items-center justify-center bg-blue-500 px-8 rounded-t-lg">
                <TabsTrigger 
                  className="text-lg font-semibold text-white hover:bg-blue-600 transition-colors duration-300 px-6 py-2 rounded-md" 
                  value="description"
                >
                  DESCRIPTION
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4 bg-white p-6 rounded-b-lg shadow-md">
                <Markdown content={data.content} />
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default EventDetailPage;


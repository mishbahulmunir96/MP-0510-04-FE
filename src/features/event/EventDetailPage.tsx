"use client";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image";
import { CalendarIcon, ClockIcon, MapPinIcon, TicketIcon, FileTextIcon, UserIcon, QrCodeIcon, InfoIcon } from 'lucide-react';

import { RootState } from "@/redux/store";
import useGetEvent from "@/hooks/api/event/useGetEvent";
import Markdown from "@/components/Markdown";
import LoadingScreen from "@/components/LoadingScreen";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionModal from "./compoents/TrasnsactionModal";

interface EventDetailProps {
  eventId: number;
}

const EventDetailPage: React.FC<EventDetailProps> = ({ eventId }) => {
  const user = useSelector((state: RootState) => state.user);
  const userId = user.id;
  const { data, isPending } = useGetEvent(eventId);

  const handleComplete = () => {
    // Logic to close modal if needed
  };

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">
          No data available
        </h1>
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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative h-[300px] overflow-hidden rounded-xl shadow-lg sm:h-[400px]">
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
            <Card className="shadow-lg md:sticky md:top-6">
              <CardContent className="space-y-6 p-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  {data.title}
                </h1>
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

                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 text-blue-500" />
                    <p className="line-clamp-1"> Ticket Available: {""}{data.availableSeat} Tickets</p>
                </div>
                </div>

               

                <div className="mt-6">
                  <p className="text-3xl font-bold text-blue-600">
                    Rp.{data.price.toLocaleString()}
                  </p>
                </div>

                <div className="mt-6">
                  <TransactionModal
                    eventId={eventId}
                    userId={userId}
                    ticketPrice={data.price}
                    onComplete={handleComplete}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 gap-8 pt-10 lg:grid-cols-3"
        >
          <div className="lg:col-span-3">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="flex h-16 items-center justify-center gap-8 space-x-4 rounded-t-lg bg-transparent">
                <TabsTrigger 
                  value="description"
                  className="relative overflow-hidden data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-md"
                >
                  <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="relative w-48 h-24 bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="absolute top-0 left-0 w-full h-1/3 bg-green-500"></div>
                      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-teal-500"></div>
                      <div className="absolute inset-1 bg-white rounded-lg flex flex-col justify-between p-2">
                        <div className="flex justify-between items-center">
                          <FileTextIcon className="h-6 w-6 text-green-500" />
                          <p className="text-xs font-semibold text-gray-500">Details</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-gray-800 truncate">Event Description</p>
                          <p className="text-xs text-gray-500">{format(new Date(data.startTime), "dd MMM yyyy")}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <p className="text-xs text-gray-500">Info</p>
                          </div>
                          <p className="text-xs font-semibold text-green-600">View</p>
                        </div>
                      </div>
                      <div className="absolute -left-2 top-1/2 h-4 w-4 rounded-full bg-white transform -translate-y-1/2"></div>
                      <div className="absolute -right-2 top-1/2 h-4 w-4 rounded-full bg-white transform -translate-y-1/2"></div>
                    </div>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="tickets"
                  className="relative overflow-hidden text-blue-600 "
                >
                  <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="relative w-48 h-24 bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="absolute top-0 left-0 w-full h-1/3 bg-blue-500"></div>
                      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-purple-500"></div>
                      <div className="absolute inset-1 bg-white rounded-lg flex flex-col justify-between p-2">
                        <div className="flex justify-between items-center">
                          <TicketIcon className="h-6 w-6 text-blue-500" />
                          <p className="text-xs font-semibold text-gray-500">#{eventId.toString().padStart(6, '0')}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-gray-800 truncate">Event Ticket</p>
                          <p className="text-xs text-gray-500">{format(new Date(data.startTime), "dd MMM yyyy")}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <p className="text-xs text-gray-500">1x</p>
                          </div>
                          <p className="text-xs font-semibold text-blue-600">Rp.{data.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="absolute -left-2 top-1/2 h-4 w-4 rounded-full bg-white transform -translate-y-1/2"></div>
                      <div className="absolute -right-2 top-1/2 h-4 w-4 rounded-full bg-white transform -translate-y-1/2"></div>
                    </div>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="description"
                className="space-y-6 rounded-b-lg bg-white p-8 shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-green-500 to-teal-500 p-1 rounded-lg shadow-lg">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Event Details</h2>
                        <InfoIcon className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="border-t border-b border-gray-200 py-4 space-y-2">
                        <p className="text-lg font-semibold text-gray-800">{data.title}</p>
                        <div className="flex items-center text-gray-600">
                          <CalendarIcon className="h-5 w-5 mr-2" />
                          <p>{format(new Date(data.startTime), "dd MMMM yyyy")}</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <ClockIcon className="h-5 w-5 mr-2" />
                          <p>{format(new Date(data.startTime), "HH:mm")} - {format(new Date(data.endTime), "HH:mm")}</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPinIcon className="h-5 w-5 mr-2" />
                          <p className="line-clamp-1">{data.address}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
                        <div className="prose max-w-none">
                          <Markdown content={data.content} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="tickets"
                className="space-y-6 rounded-b-lg bg-white p-8 shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-lg shadow-lg">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Event Ticket</h2>
                        <p className="text-sm font-semibold text-gray-500">#{eventId.toString().padStart(6, '0')}</p>
                      </div>
                      <div className="border-t border-b border-gray-200 py-4 space-y-2">
                        <p className="text-lg font-semibold text-gray-800">{data.title}</p>
                        <div className="flex items-center text-gray-600">
                          <CalendarIcon className="h-5 w-5 mr-2" />
                          <p>{format(new Date(data.startTime), "dd MMMM yyyy")}</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <ClockIcon className="h-5 w-5 mr-2" />
                          <p>{format(new Date(data.startTime), "HH:mm")} - {format(new Date(data.endTime), "HH:mm")}</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPinIcon className="h-5 w-5 mr-2" />
                          <p className="line-clamp-1">{data.address}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <p className="text-gray-600">1x General Admission</p>
                        </div>
                        <p className="text-xl font-bold text-blue-600">Rp.{data.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-6 flex justify-between items-center">
                      <div className="text-gray-600">
                        <p className="font-semibold">Attendee</p>
                      </div>
                      <div className="bg-white p-2 rounded-lg">
                        <QrCodeIcon className="h-24 w-24 text-gray-800" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-lg text-gray-700">
                  This ticket grants you access to the event. Please ensure you bring a copy of your ticket (digital or printed) to the venue. The QR code will be scanned at entry.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default EventDetailPage;


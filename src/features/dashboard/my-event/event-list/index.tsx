"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetEventsByOrganizer from "@/hooks/api/event/useGetEventsByOrganizer";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EventListPage = () => {
  const { data: events, isLoading, error } = useGetEventsByOrganizer();
  const router = useRouter();

  if (isLoading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-5 text-2xl font-bold">Event List</h1>

      {/* Table view for medium screens and up */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>A list of upcoming events</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total Tickets</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events && events.length > 0 ? (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.id}</TableCell>
                  <TableCell>
                    <Image
                      src={event.thumbnail || "/path/to/placeholder.jpg"}
                      alt={event.title}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>
                    {event.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </TableCell>
                  <TableCell>{event.availableSeat}</TableCell>
                  <TableCell>
                    {format(new Date(event.startTime), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(event.endTime), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/dashboard/update-event/${event.id}`)
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  No events available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Card view for small screens */}
      <div className="space-y-4 md:hidden">
        {events && events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{event.title}</span>
                  <span className="text-sm font-normal">ID: {event.id}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center space-x-4">
                  <Image
                    src={event.thumbnail || "/path/to/placeholder.jpg"}
                    alt={event.title}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {event.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {event.availableSeat} tickets available
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Start:</span>{" "}
                    {format(new Date(event.startTime), "dd MMM yyyy")}
                  </p>
                  <p>
                    <span className="font-medium">End:</span>{" "}
                    {format(new Date(event.endTime), "dd MMM yyyy")}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() =>
                    router.push(`/dashboard/update-event/${event.id}`)
                  }
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-6 text-center text-gray-500">
              No events available.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventListPage;

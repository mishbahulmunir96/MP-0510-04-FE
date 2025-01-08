"use client";

import PaginationSection from "@/components/PaginationSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAttendeesByEvent from "@/hooks/api/attendee/useGetAttendeesByEvent";
import useGetEventsByOrganizer from "@/hooks/api/event/useGetEventsByOrganizer";
import { useAppSelector } from "@/redux/hooks";
import { Attendee } from "@/types/attendee";
import { Event } from "@/types/event";
import { useState } from "react";

const AttendancePage = () => {
  const user = useAppSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [take] = useState(10);

  const {
    data: events = [],
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useGetEventsByOrganizer();
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const {
    data: attendees,
    isLoading: isLoadingAttendees,
    error: errorAttendees,
  } = useGetAttendeesByEvent(selectedEventId || 0, user.id, page, take);
  console.log("data attend", attendees);

  const handleEventChange = (value: string) => {
    setSelectedEventId(Number(value));
  };

  const selectedEvent = events?.find((event) => event.id === selectedEventId);

  const totalTicketsSold =
    attendees?.data.reduce(
      (acc: number, attendee: Attendee) => acc + attendee.ticketCount,
      0,
    ) || 0;
  const totalRevenue =
    attendees?.data.reduce(
      (acc: number, attendee: Attendee) => acc + attendee.totalPrice,
      0,
    ) || 0;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-3xl font-bold">Event Attendees</h1>
      <Card>
        <CardHeader>
          <CardTitle>Attendee List</CardTitle>
          <CardDescription>View attendees for each event</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={handleEventChange}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingEvents ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : errorEvents ? (
                  <SelectItem value="error" disabled>
                    Error loading events
                  </SelectItem>
                ) : (
                  events?.map((event: Event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          {isLoadingAttendees ? (
            <p>Loading attendees...</p>
          ) : errorAttendees ? (
            <p>Error loading attendees: {errorAttendees.message}</p>
          ) : attendees.data && attendees.data.length > 0 ? (
            <Table>
              <TableCaption>
                List of attendees for {selectedEvent?.title}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ticket Quantity</TableHead>
                  <TableHead>Total Price Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.data.map((attendee: Attendee) => (
                  <TableRow key={attendee.id}>
                    <TableCell>{attendee.name}</TableCell>
                    <TableCell>{attendee.email}</TableCell>
                    <TableCell>{attendee.ticketCount}</TableCell>
                    <TableCell>{attendee.totalPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No attendees available for this event.</p>
          )}
          {selectedEvent && (
            <div className="mt-4">
              <p className="font-semibold">Event Summary:</p>
              <p>Total Attendees: {attendees?.data.length || 0}</p>
              <p>Total Tickets Sold: {totalTicketsSold}</p>
              <p>
                Total Revenue:{" "}
                {totalRevenue.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {attendees && (
        <PaginationSection
          page={page}
          take={take}
          total={attendees.meta.total}
          onChangePage={handlePageChange}
        />
      )}
    </div>
  );
};

export default AttendancePage;

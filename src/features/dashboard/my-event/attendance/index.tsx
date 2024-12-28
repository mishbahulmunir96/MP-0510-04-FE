"use client";

import { useState } from "react";
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
import { mockEventData, EventData, Attendee } from "@/utils/eventData";

const AttendancePage = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const handleEventChange = (eventId: string) => {
    const event = mockEventData.find((e) => e.id === parseInt(eventId));
    setSelectedEvent(event || null);
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
                {mockEventData.map((event) => (
                  <SelectItem key={event.id} value={event.id.toString()}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedEvent && (
            <Table>
              <TableCaption>
                List of attendees for {selectedEvent.name}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Attendee Name</TableHead>
                  <TableHead>Ticket Quantity</TableHead>
                  <TableHead>Total Price Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedEvent.attendees.map((attendee: Attendee) => (
                  <TableRow key={attendee.id}>
                    <TableCell>{attendee.name}</TableCell>
                    <TableCell>{attendee.ticketQuantity}</TableCell>
                    <TableCell>${attendee.totalPaid.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {selectedEvent && (
            <div className="mt-4">
              <p className="font-semibold">Event Summary:</p>
              <p>Total Attendees: {selectedEvent.attendees.length}</p>
              <p>Total Tickets Sold: {selectedEvent.ticketsSold}</p>
              <p>Total Revenue: ${selectedEvent.revenue.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendancePage;

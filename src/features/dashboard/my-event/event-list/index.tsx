"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetEventsByUser from "@/hooks/api/event/useGetEventsByUser";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const EventListPage = () => {
  const { data: events, isLoading, error } = useGetEventsByUser();
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Event List</h1>

      {events?.length === 0 && <p>No events available.</p>}
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
          {events?.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.id}</TableCell>
              <TableCell>
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>${event.price.toFixed(2)}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventListPage;

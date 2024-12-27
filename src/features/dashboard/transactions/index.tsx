"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
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
import Image from "next/image";
import { useRouter } from "next/navigation";

const TransactionsPage = () => {
  const { data: events, isLoading, error } = useGetEventsByUser();
  const router = useRouter();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Transaction List</h1>

      {events?.length === 0 && <p>No Transaction available.</p>}
      <Table>
        <TableCaption>A list of transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Event Name</TableHead>
            <TableHead>Total Ticket</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Payment Proof</TableHead>
            <TableHead>Status</TableHead>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsPage;

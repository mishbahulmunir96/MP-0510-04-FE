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

const events = [
  {
    id: 1,
    thumbnail: "/event1.jpg",
    title: "Summer Music Festival",
    price: 49.99,
    totalTickets: 1000,
    startDate: new Date("2023-07-15"),
    endDate: new Date("2023-07-17"),
  },
  {
    id: 2,
    thumbnail: "/event2.jpg",
    title: "Tech Conference 2023",
    price: 299.99,
    totalTickets: 500,
    startDate: new Date("2023-09-10"),
    endDate: new Date("2023-09-12"),
  },
  // Add more mock events as needed
];

const EventListPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Event List</h1>
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
          {events.map((event) => (
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
              <TableCell>{event.totalTickets}</TableCell>
              <TableCell>{event.startDate.toLocaleDateString()}</TableCell>
              <TableCell>{event.endDate.toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
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

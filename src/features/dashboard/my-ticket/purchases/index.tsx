"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { mockPurchases, Purchase, Ticket } from "@/utils/customerData";

export default function PurchasesHistoryPage() {
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(
    null,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      case "In Process":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-3xl font-bold">Purchase History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Purchases</CardTitle>
          <CardDescription>
            A list of all your event ticket purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block">
            {" "}
            {/* Table view for medium screens and up */}
            <Table>
              <TableCaption>A list of your recent purchases</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Event Date</TableHead>
                  <TableHead>Tickets</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>{purchase.eventName}</TableCell>
                    <TableCell>
                      {format(purchase.eventDate, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {purchase.tickets.reduce(
                        (sum, ticket) => sum + ticket.quantity,
                        0,
                      )}
                    </TableCell>
                    <TableCell>${purchase.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(purchase.transactionStatus)}
                      >
                        {purchase.transactionStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPurchase(purchase)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Purchase Details</DialogTitle>
                            <DialogDescription>
                              Complete information about your purchase
                            </DialogDescription>
                          </DialogHeader>
                          <PurchaseDetails purchase={selectedPurchase} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="space-y-4 md:hidden">
            {" "}
            {/* Card view for small screens */}
            {mockPurchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader>
                  <CardTitle>{purchase.eventName}</CardTitle>
                  <CardDescription>
                    {format(purchase.eventDate, "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tickets:</span>
                      <span>
                        {purchase.tickets.reduce(
                          (sum, ticket) => sum + ticket.quantity,
                          0,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Price:</span>
                      <span>${purchase.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <Badge
                        className={getStatusColor(purchase.transactionStatus)}
                      >
                        {purchase.transactionStatus}
                      </Badge>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPurchase(purchase)}
                          className="w-full"
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Purchase Details</DialogTitle>
                          <DialogDescription>
                            Complete information about your purchase
                          </DialogDescription>
                        </DialogHeader>
                        <PurchaseDetails purchase={selectedPurchase} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PurchaseDetails({ purchase }: { purchase: Purchase | null }) {
  if (!purchase) return null;

  return (
    <div className="mt-4 space-y-4">
      <div>
        <h3 className="font-semibold">Event Information</h3>
        <p>
          <strong>Name:</strong> {purchase.eventName}
        </p>
        <p>
          <strong>Date:</strong> {format(purchase.eventDate, "MMMM d, yyyy")}
        </p>
        <p>
          <strong>Location:</strong> {purchase.eventLocation}
        </p>
        <p>
          <strong>Description:</strong> {purchase.eventDescription}
        </p>
      </div>
      <div>
        <h3 className="font-semibold">Ticket Information</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price per Ticket</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchase.tickets.map((ticket: Ticket, index: number) => (
              <TableRow key={index}>
                <TableCell>{ticket.type}</TableCell>
                <TableCell>{ticket.quantity}</TableCell>
                <TableCell>${ticket.pricePerTicket.toFixed(2)}</TableCell>
                <TableCell>
                  ${(ticket.quantity * ticket.pricePerTicket).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <p>
          <strong>Total Price:</strong> ${purchase.totalPrice.toFixed(2)}
        </p>
        <p>
          <strong>Purchase Date:</strong>{" "}
          {format(purchase.purchaseDate, "MMMM d, yyyy")}
        </p>
        <p>
          <strong>Transaction Status:</strong> {purchase.transactionStatus}
        </p>
      </div>
    </div>
  );
}

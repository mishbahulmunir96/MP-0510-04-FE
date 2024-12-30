"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TransactionForm from "./TransactionForm";

interface TransactionModalProps {
  eventId: number; // Menerima eventId dari parent
  userId: number; // Menerima userId dari parent
  ticketPrice: number; // Menerima harga tiket dari parent
  onComplete: () => void; // Menerima onComplete dari parent
}

export default function TransactionModal({
  eventId,
  userId,
  ticketPrice,
  onComplete,
}: TransactionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Purchase Tickets</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase Tickets</DialogTitle>
          <DialogDescription>
            Enter your transaction details below
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          eventId={eventId}
          userId={userId}
          ticketPrice={ticketPrice} // Meneruskan ticketPrice ke TransactionForm
          onComplete={onComplete}
        />
      </DialogContent>
    </Dialog>
  );
}

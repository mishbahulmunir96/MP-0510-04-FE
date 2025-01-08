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
  availableSeats: number; // Menerima jumlah tiket yang tersedia dari parent  
  onComplete: (ticketCount: number) => void; // Menerima onComplete dari parent  
}  
  
export default function TransactionModal({  
  eventId,  
  userId,  
  ticketPrice,  
  availableSeats,  
  onComplete,  
}: TransactionModalProps) {  
  const [isOpen, setIsOpen] = useState(false);  
  
  const handleTransactionComplete = (ticketCount: number) => {  
    // Logika untuk menyelesaikan transaksi  
    // Misalnya, Anda bisa memanggil API untuk melakukan pembelian tiket di sini  
  
    // Setelah transaksi berhasil, panggil onComplete dengan ticketCount  
    onComplete(ticketCount);  
    setIsOpen(false); // Tutup modal setelah transaksi selesai  
  };  
  
  return (  
    <Dialog open={isOpen} onOpenChange={setIsOpen}>  
      <DialogTrigger asChild>  
        <Button className="bg-gradient-to-r from-purple-500 to-blue-400 text-white">Purchase Tickets</Button>  
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
          availableSeats={availableSeats} // Meneruskan availableSeats ke TransactionForm  
          onComplete={handleTransactionComplete} // Menggunakan handler baru  
        />  
      </DialogContent>  
    </Dialog>  
  );  
}  

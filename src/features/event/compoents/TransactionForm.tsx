'use client'

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

const TICKET_PRICE = 10; // Price per ticket in dollars
const COUPON_DISCOUNT = 0.1; // 10% discount for valid coupon
const POINTS_DISCOUNT_RATE = 0.01; // $0.01 discount per point

interface TransactionFormProps {
  onComplete: () => void;
}

export default function TransactionForm({ onComplete }: TransactionFormProps) {
  const [tickets, setTickets] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [points, setPoints] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    calculateTotalPrice();
  }, [tickets, couponCode, points]);

  const calculateTotalPrice = () => {
    const numberOfTickets = parseInt(tickets) || 0;
    const pointsUsed = parseInt(points) || 0;
    let price = numberOfTickets * TICKET_PRICE;

    // Apply coupon discount
    if (couponCode.toLowerCase() === 'discount') {
      price = price * (1 - COUPON_DISCOUNT);
    }

    // Apply points discount
    const pointsDiscount = pointsUsed * POINTS_DISCOUNT_RATE;
    price = Math.max(price - pointsDiscount, 0); // Ensure price doesn't go negative

    setTotalPrice(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transactionId = Math.random().toString(36).substr(2, 9); // Generate a random ID for demo purposes

    if (!tickets || parseInt(tickets) <= 0) {
      toast.error("Please enter a valid number of tickets.");
      return;
    }

    toast.info("Transaction Initiated. Redirecting to payment details...");
    onComplete();
    router.push(
      `/transaction/${transactionId}?tickets=${tickets}&total=${totalPrice.toFixed(2)}&voucher=${voucherCode}&points=${points}`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tickets">Number of Tickets</Label>
        <Input
          id="tickets"
          type="number"
          min="1"
          placeholder="Enter number of tickets"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="voucher">Voucher Code</Label>
        <Input
          id="voucher"
          type="text"
          placeholder="Enter voucher code (optional)"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="points">Points</Label>
        <Input
          id="points"
          type="number"
          min="0"
          placeholder="Enter points to use (optional)"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="coupon">Coupon Code</Label>
        <Input
          id="coupon"
          type="text"
          placeholder="Enter coupon code (optional)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
      </div>
      <div className="pt-4">
        <p className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
      <Button type="submit" className="w-full">Complete Transaction</Button>
    </form>
  );
}

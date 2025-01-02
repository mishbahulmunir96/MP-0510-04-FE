"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useCreateTransaction, { TransactionStatus } from "@/hooks/api/transaction/useCreateTransaction";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

interface TransactionFormProps {
  eventId: number; // ID event yang sedang dibuka
  userId: number; // ID pengguna yang login
  onComplete: () => void; // Callback yang dipanggil setelah sukses
  ticketPrice: number; // Harga per tiket
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  eventId,
  userId,
  onComplete,
  ticketPrice,
}) => {
  const { mutateAsync: createTransaction } = useCreateTransaction();
  const [tickets, setTickets] = useState("");
  const [voucherId, setVoucherId] = useState<number | null>(null);
  const [points, setPoints] = useState("");
  const [couponId, setCouponId] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const validationSchema = Yup.object().shape({
    tickets: Yup.number()
      .required("Number of tickets is required")
      .min(1, "At least 1 ticket is required")
      .typeError("Must be a number"),
    voucher: Yup.number().nullable().typeError("Voucher ID must be a number"), // Mengizinkan voucherID menjadi number
    points: Yup.number()
      .nullable()
      .min(0, "Points cannot be negative")
      .typeError("Must be a number"),
    coupon: Yup.number().nullable().typeError("Coupon ID must be a number"), // Mengizinkan couponID menjadi number
  });

  const formik = useFormik({
    initialValues: {
      tickets: "",
      voucher: "",
      points: "",
      coupon: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const transactionData = {
        userId,
        eventId,
        ticketCount: parseInt(values.tickets),
        voucherId: voucherId || null,
        pointsToUse: Number(points),
        couponId: couponId || null,
        status: TransactionStatus.WAITING_PAYMENT,
        amount: totalPrice, // Menggunakan total price yang sudah dihitung
      };

      try {
        await createTransaction(transactionData);
        toast.success("Transaction Created Successfully!");
        onComplete(); // Menutup modal setelah berhasil
      } catch (error) {
        toast.error("Failed to create transaction");
      }
    },
  });

  // Menghitung total harga tiket
  useEffect(() => {
    const numberOfTickets = parseInt(formik.values.tickets) || 0; // Mengambil jumlah tiket
    setTotalPrice(numberOfTickets * ticketPrice); // Menghitung total harga berdasarkan tiket
  }, [formik.values.tickets, ticketPrice]); // Perbarui ketika tiket atau harga berubah

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tickets">Number of Tickets</Label>
        <Input
          id="tickets"
          name="tickets"
          type="number"
          min="1"
          placeholder="Enter number of tickets"
          value={formik.values.tickets}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.tickets && formik.errors.tickets ? (
          <div className="text-red-600">{formik.errors.tickets}</div>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="voucher">Voucher ID</Label>
        <Input
          id="voucher"
          name="voucher"
          type="number"
          placeholder="Enter voucher ID (optional)"
          value={voucherId || ""}
          onChange={(e) =>
            setVoucherId(e.target.value ? parseInt(e.target.value) : null)
          } // Simpan ID sebagai number
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="points">Points</Label>
        <Input
          id="points"
          name="points"
          type="number"
          min="0"
          placeholder="Enter points to use (optional)"
          value={points}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.points && formik.errors.points ? (
          <div className="text-red-600">{formik.errors.points}</div>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="coupon">Coupon ID</Label>
        <Input
          id="coupon"
          name="coupon"
          type="number"
          placeholder="Enter coupon ID (optional)"
          value={couponId || ""}
          onChange={(e) =>
            setCouponId(e.target.value ? parseInt(e.target.value) : null)
          } // Simpan ID sebagai number
        />
      </div>
      <div className="pt-4">
        <p className="text-lg font-semibold">
          Total Price: Rp {""}{totalPrice.toFixed(2)}
        </p>
      </div>
      <Button type="submit" className="w-full">
        Complete Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;

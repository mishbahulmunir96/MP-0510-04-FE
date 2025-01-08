"use client";    
    
import { Button } from "@/components/ui/button";    
import { Input } from "@/components/ui/input";    
import { Label } from "@/components/ui/label";    
import useCreateTransaction, { TransactionStatus } from "@/hooks/api/transaction/useCreateTransaction";    
import { useFormik } from "formik";    
import { useEffect, useState } from "react";    
import { toast } from "react-toastify";    
import * as Yup from "yup";    
    
interface TransactionFormProps {    
  eventId: number; // ID event yang sedang dibuka    
  userId: number; // ID pengguna yang login    
  availableSeats: number; // Jumlah tiket yang tersedia    
  onComplete: (ticketCount: number) => void; // Callback yang dipanggil setelah sukses    
  ticketPrice: number; // Harga per tiket    
}    
    
const TransactionForm: React.FC<TransactionFormProps> = ({    
  eventId,    
  userId,    
  availableSeats, // Menambahkan availableSeats ke props    
  onComplete,    
  ticketPrice,    
}) => {    
  const { mutateAsync: createTransaction } = useCreateTransaction();    
  const [voucherId, setVoucherId] = useState<number | null>(null);    
  const [points, setPoints] = useState("");    
  const [couponId, setCouponId] = useState<number | null>(null);    
  const [totalPrice, setTotalPrice] = useState(0);    
    
  const validationSchema = Yup.object().shape({    
    tickets: Yup.number()    
      .required("Number of tickets is required")    
      .min(1, "At least 1 ticket is required")    
      .max(availableSeats, `Cannot exceed available seats: ${availableSeats}`) // Validasi untuk tidak melebihi jumlah tiket yang tersedia    
      .typeError("Must be a number"),    
    voucher: Yup.number().nullable().typeError("Voucher ID must be a number"),    
    points: Yup.number()    
      .nullable()    
      .min(0, "Points cannot be negative")    
      .typeError("Must be a number"),    
    coupon: Yup.number().nullable().typeError("Coupon ID must be a number"),    
  });    
    
  const formik = useFormik({    
    initialValues: {    
      tickets: "", // Start with an empty string    
      voucher: "",    
      points: "",    
      coupon: "",    
    },    
    validationSchema: validationSchema,    
    onSubmit: async (values) => {    
      const selectedOptionsCount = [voucherId, points, couponId].filter(Boolean).length;    
    
      if (selectedOptionsCount > 1) {    
        toast.error("Please select only one option: Voucher, Points, or Coupon.");    
        return;     
      }    
    
      const ticketCount = parseInt(values.tickets) || 0; // Ensure it defaults to 0 if NaN  
    
      const transactionData = {    
        userId,    
        eventId,    
        ticketCount,    
        voucherId: voucherId || null,    
        pointsToUse: Number(points) || 0, // Ensure it defaults to 0 if NaN    
        couponId: couponId || null,    
        status: TransactionStatus.WAITING_PAYMENT,    
        amount: totalPrice,    
      };    
    
      try {    
        await createTransaction(transactionData);    
        toast.success("Transaction Created Successfully!");    
        onComplete(ticketCount); // Panggil onComplete dengan ticketCount    
      } catch (error) {    
        toast.error("Transaction failed. Please try again.");    
      }    
    },    
  });    
    
  useEffect(() => {    
    const numberOfTickets = parseInt(formik.values.tickets) || 0; // Default to 0 if NaN    
    setTotalPrice(numberOfTickets * ticketPrice);    
  }, [formik.values.tickets, ticketPrice]);    
    
  const formatToIDR = (amount: number) => {    
    return new Intl.NumberFormat('id-ID', {    
      style: 'currency',    
      currency: 'IDR',    
    }).format(amount);    
  };    
    
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
          }    
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
          }    
        />    
      </div>    
      <div className="pt-4">    
        <p className="text-lg font-semibold">    
          Total Price: {formatToIDR(totalPrice)}    
        </p>    
      </div>    
      <Button type="submit" className="w-full">    
        Complete Transaction    
      </Button>    
    </form>    
  );    
};    
    
export default TransactionForm;    

"use client";

import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useGetTransaction from "@/hooks/api/transaction/useGetTransaction";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import useUploadPaymentProof from "@/hooks/api/transaction/useUploadPaymentProof"; // Import hook untuk upload
import { AxiosError } from "axios";
import { format } from "date-fns";

const TransactionDetailPage: FC<{ transactionId: number }> = ({
  transactionId,
}) => {
  const { data, isPending, error } = useGetTransaction(transactionId); // Mengambil data transaksi
  const { mutateAsync: uploadProof } = useUploadPaymentProof(); // Hook untuk upload bukti pembayaran
  const [proofFile, setProofFile] = useState<File | null>(null); // State untuk menyimpan file bukti

  useEffect(() => {
    if (error) {
      toast.error("Failed to load transaction details: " + error.message);
    }
  }, [error]);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">
          No transaction data available
        </h1>
      </div>
    );
  }

  const handleUploadProof = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah pengiriman form

    if (!proofFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const proofData = {
      transactionId: data.id, // ID transaksi
      paymentProof: proofFile, // File bukti pembayaran
    };

    try {
      await uploadProof(proofData); // Memanggil hook untuk mengupload bukti
      toast.success("Uploaded payment proof successfully");
      // Anda mungkin ingin memuat ulang data transaksi untuk melihat perubahan
    } catch (error) {
      // Memeriksa tipe error dan memberikan pesan yang sesuai
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to upload payment proof",
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>Transaction ID: {data.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>
              <strong>User ID:</strong> {data.userId}
            </p>
            <p>
              <strong>Event ID:</strong> {data.eventId}
            </p>
            <p>
              <strong>Number of Tickets:</strong> {data.ticketCount}
            </p>
            <p>
              <strong>Total Amount:</strong> Rp.{data.amount.toLocaleString()}
            </p>
            <p>
              <strong>Payment Status:</strong> {data.status}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {format(new Date(data.createdAt), "dd MMM yyyy HH:mm")}
            </p>
            <p>
              <strong>Payment Proof:</strong>{" "}
              {data.paymentProof ? data.paymentProof : "No Payment Proof"}
            </p>
          </div>
          <form onSubmit={handleUploadProof} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="proof">Upload Payment Proof</label>
              <input
                id="proof"
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setProofFile(file); // Simpan file yang di-upload
                  }
                }}
                required
              />
            </div>
            <Button type="submit">Upload Proof</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Please upload your payment proof to confirm your transaction.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TransactionDetailPage;

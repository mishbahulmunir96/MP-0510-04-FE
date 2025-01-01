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
import useUploadPaymentProof from "@/hooks/api/transaction/useUploadPaymentProof";
import { AxiosError } from "axios";
import { format } from "date-fns";
import LoadingScreen from "@/components/LoadingScreen";

const TransactionDetailPage: FC = () => {
  const { id } = useParams();
  const transactionId = Number(id);
  const { data, isPending, error, refetch } = useGetTransaction(transactionId);
  const { mutateAsync: uploadProof } = useUploadPaymentProof();
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [countdown, setCountdown] = useState<number>(7200);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load transaction details: " + error.message);
    }
  }, [error]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data && data.paymentProof) {
      setIsUploaded(true);
      setCountdown(0);
    }
  }, [data]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (isPending) {
    return <LoadingScreen />;
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
    e.preventDefault();

    if (!proofFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const proofData = {
      transactionId: data.id,
      paymentProof: proofFile,
    };

    try {
      await uploadProof(proofData);
      toast.success("Uploaded payment proof successfully");
      setIsUploaded(true);
      setCountdown(0);
      await refetch();
    } catch (error) {
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
      <Card className="mx-auto w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl">Transaction Details</CardTitle>
          <CardDescription className="text-primary-foreground/80">Transaction ID: {data.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem label="User ID" value={data.userId} />
            <InfoItem label="Event ID" value={data.eventId} />
            <InfoItem label="Number of Tickets" value={data.ticketCount} />
            <InfoItem label="Total Amount" value={`Rp.${data.amount.toLocaleString()}`} />
            <InfoItem label="Payment Status" value={data.status} />
            <InfoItem label="Created At" value={format(new Date(data.createdAt), "dd MMM yyyy HH:mm")} />
            <InfoItem
              label="Payment Proof"
              value={
                data.paymentProof ? (
                  <a href={data.paymentProof} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    View Payment Proof
                  </a>
                ) : (
                  "No Payment Proof"
                )
              }
            />
            <InfoItem
              label="Time Remaining"
              value={isUploaded ? "Your payment under review" : formatTime(countdown)}
            />
          </div>
          {!isUploaded && (
            <form onSubmit={handleUploadProof} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="proof" className="block text-sm font-medium text-gray-700">
                  Upload Payment Proof
                </label>
                <input
                  id="proof"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setProofFile(file);
                    }
                  }}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button type="submit" className="w-full">Upload Proof</Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 p-4">
          <p className="text-sm text-muted-foreground">
            Please upload your payment proof to confirm your transaction.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

const InfoItem: FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base font-semibold">{value}</p>
  </div>
);

export default TransactionDetailPage;


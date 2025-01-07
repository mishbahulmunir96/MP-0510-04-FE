"use client";  
  
import { FC, useEffect, useState } from "react";  
import useGetTransaction from "@/hooks/api/transaction/useGetTransaction";  
import useUploadPaymentProof from "@/hooks/api/transaction/useUploadPaymentProof";  
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";  
import { Button } from "@/components/ui/button";  
import { toast } from "react-toastify";  
import { AxiosError } from "axios";  
import { format } from "date-fns";  
import LoadingScreen from "@/components/LoadingScreen";  
import { Clock, Upload, CheckCircle, AlertCircle } from 'lucide-react';  
  
interface TransactionDetailPageProps {  
  transactionId: number;  
}  
  
const TransactionDetailPage: FC<TransactionDetailPageProps> = ({ transactionId }) => {  
  const { data, isPending, error, refetch } = useGetTransaction(transactionId);  
  const { mutateAsync: uploadProof } = useUploadPaymentProof();  
  const [proofFile, setProofFile] = useState<File | null>(null);  
  const [countdown, setCountdown] = useState<number>(7200);  
  const [isUploaded, setIsUploaded] = useState<boolean>(false);  
  const [uploadedProofUrl, setUploadedProofUrl] = useState<string | null>(null);  
  
  useEffect(() => {  
    if (error) {  
      toast.error("Failed to load transaction details: " + error.message);  
    }  
  }, [error]);  
  
  useEffect(() => {  
    const storedStartTime = localStorage.getItem(`transaction_${transactionId}_startTime`);  
    const startTime = storedStartTime ? parseInt(storedStartTime, 10) : Date.now();  
      
    if (!storedStartTime) {  
      localStorage.setItem(`transaction_${transactionId}_startTime`, startTime.toString());  
    }  
  
    const calculateRemainingTime = () => {  
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);  
      return Math.max(7200 - elapsedTime, 0);  
    };  
  
    setCountdown(calculateRemainingTime());  
  
    const interval = setInterval(() => {  
      setCountdown((prev) => {  
        const newCountdown = calculateRemainingTime();  
        if (newCountdown <= 0) {  
          clearInterval(interval);  
          return 0;  
        }  
        return newCountdown;  
      });  
    }, 1000);  
  
    return () => clearInterval(interval);  
  }, [transactionId]);  
  
  useEffect(() => {  
    if (data && data.paymentProof) {  
      setIsUploaded(true);  
      setUploadedProofUrl(data.paymentProof);  
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
    return (  
      <div className="flex h-screen items-center justify-center">  
        <LoadingScreen />  
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
      setIsUploaded(true);  
      setUploadedProofUrl(URL.createObjectURL(proofFile));  
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
  
  const isExpired = data.status === "expired";  
  const isWaitingConfirmation = data.status === "waitingConfirmation";  
  const isDone = data.status === "done";  
  
  return (  
    <div className="container mx-auto p-4 ">  
      <Card className="mx-auto w-full max-w-2xl  overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">  
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">  
          <h2 className="text-3xl font-bold">Transaction Details</h2>  
          <p className="text-primary-foreground/80">Transaction ID: {data.id}</p>  
        </CardHeader>  
        <CardContent className="space-y-6 p-6">  
          <div className="grid gap-6 md:grid-cols-2">  
            <InfoItem icon={<UserIcon />} label="User ID" value={data.userId} />  
            <InfoItem icon={<CalendarIcon />} label="Event ID" value={data.eventId} />  
            <InfoItem icon={<TicketIcon />} label="Number of Tickets" value={data.ticketCount} />  
            <InfoItem icon={<DollarIcon />} label="Total Amount" value={`Rp.${data.amount.toLocaleString()}`} />  
            <InfoItem   
              icon={<StatusIcon status={data.status} />}   
              label="Payment Status"   
              value={<span className={`font-semibold ${getStatusColor(data.status)}`}>{data.status}</span>}   
            />  
            <InfoItem   
              icon={<ClockIcon />}   
              label="Created At"   
              value={format(new Date(data.createdAt), "dd MMM yyyy HH:mm")}   
            />  
            <InfoItem  
              icon={<FileIcon />}  
              label="Payment Proof"  
              value={  
                uploadedProofUrl ? (   
                  <a  
                    href={uploadedProofUrl}  
                    target="_blank"  
                    rel="noopener noreferrer"  
                    className="text-primary hover:underline"  
                  >  
                    View Uploaded Payment Proof  
                  </a>  
                ) : (  
                  "No Payment Proof"  
                )  
              }  
            />  
            {!isExpired && !isWaitingConfirmation && !isDone && data.status !== "Cancelled" && (  
              <InfoItem  
                icon={<Clock className="h-5 w-5 text-blue-500" />}  
                label="Time Remaining"  
                value={  
                  isUploaded ? (  
                    <span className="text-green-500">Your payment is under review</span>  
                  ) : (  
                    <span className="text-red-500 font-bold">{formatTime(countdown)}</span>  
                  )  
                }  
              />  
            )}  
          </div>  
          {!isUploaded && !isExpired && (  
            <form onSubmit={handleUploadProof} className="mt-6 space-y-4">  
              <div className="space-y-2">  
                <label  
                  htmlFor="proof"  
                  className="block text-sm font-medium text-gray-700"  
                >  
                  Upload Payment Proof  
                </label>  
                <div className="flex items-center space-x-2">  
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
                    className="hidden"  
                  />  
                  <label  
                    htmlFor="proof"  
                    className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"  
                  >  
                    Choose File  
                  </label>  
                  <span className="text-sm text-gray-500">  
                    {proofFile ? proofFile.name : "No file chosen"}  
                  </span>  
                </div>  
              </div>  
              <Button type="submit" className="w-full">  
                <Upload className="mr-2 h-4 w-4" />  
                Upload Proof  
              </Button>  
            </form>  
          )}  
        </CardContent>  
        <CardFooter className="bg-gray-50 p-4">  
          <p className="text-sm text-muted-foreground">  
            {isUploaded ? (  
              <span className="flex items-center text-green-600">  
                <CheckCircle className="mr-2 h-4 w-4" />  
                Payment proof uploaded. Please wait for confirmation.  
              </span>  
            ) : (  
              <span className="flex items-center text-yellow-600">  
                <AlertCircle className="mr-2 h-4 w-4" />  
                Please upload your payment proof to confirm your transaction.  
              </span>  
            )}  
          </p>  
        </CardFooter>  
      </Card>  
    </div>  
  );  
};  
  
const InfoItem: FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({  
  icon,  
  label,  
  value,  
}) => (  
  <div className="flex items-center space-x-3">  
    {icon}  
    <div>  
      <p className="text-sm font-medium text-gray-500">{label}</p>  
      <p className="text-base font-semibold">{value}</p>  
    </div>  
  </div>  
);  
  
const UserIcon = () => <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;  
const CalendarIcon = () => <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;  
const TicketIcon = () => <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>;  
const DollarIcon = () => <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;  
const ClockIcon = () => <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;  
const FileIcon = () => <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;  
  
const StatusIcon: FC<{ status: string }> = ({ status }) => {  
  switch (status.toLowerCase()) {  
    case 'done':  
      return <CheckCircle className="h-5 w-5 text-green-500" />;  
    case 'expired':  
      return <AlertCircle className="h-5 w-5 text-red-500" />;  
    case 'waitingconfirmation':  
      return <Clock className="h-5 w-5 text-yellow-500" />;  
    default:  
      return <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;  
  }  
};  
  
const getStatusColor = (status: string) => {  
  switch (status.toLowerCase()) {  
    case 'done':  
      return 'text-green-500';  
    case 'expired':  
      return 'text-red-500';  
    case 'waitingconfirmation':  
      return 'text-yellow-500';  
    default:  
      return 'text-gray-500';  
  }  
};  
  
export default TransactionDetailPage;  

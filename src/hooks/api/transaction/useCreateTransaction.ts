import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Tambahkan import untuk router

// Menggunakan enum untuk status
export enum TransactionStatus {
  PENDING = "pending",
  WAITING_PAYMENT = "waitingPayment",
  WAITING_CONFIRMATION = "waitingConfirmation", // Tambahkan status baru
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface CreateTransactionPayload {
  userId: number;
  eventId: number;
  ticketCount: number;
  voucherId?: number | null; // Opsional
  couponId?: number | null; // Opsional
  pointsToUse?: number; // Opsional
  status: TransactionStatus; // Gunakan enum untuk status
  amount: number; // Pastikan amount ada juga
  paymentProofUploaded?: boolean; // Menunjukkan apakah bukti pembayaran diunggah
}

const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  const router = useRouter(); // Menggunakan router untuk navigasi

  return useMutation({
    mutationFn: async (payload: CreateTransactionPayload) => {
      const { data } = await axiosInstance.post(`/transactions`, payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction Created Successfully");
      router.push(`/transaction/${data.id}`); // Navigasi ke halaman detail transaksi
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred";
      toast.error(errorMessage);
    },
  });
};

export default useCreateTransaction;

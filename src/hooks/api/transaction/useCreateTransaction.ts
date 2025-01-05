import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export enum TransactionStatus {
  PENDING = "pending",
  WAITING_PAYMENT = "waitingPayment",
  WAITING_CONFIRMATION = "waitingConfirmation",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface CreateTransactionPayload {
  userId: number;
  eventId: number;
  ticketCount: number;
  voucherId?: number | null;
  couponId?: number | null;
  pointsUse?: number; // Sesuai dengan service backend
  paymentProofUploaded?: boolean;
}

const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: CreateTransactionPayload) => {
      // Mengirimkan payload ke backend
      const { data } = await axiosInstance.post(`/transactions`, payload);
      return data;
    },
    onSuccess: (data) => {
      // Invalidasi cache untuk memperbarui data transaksi
      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      // Navigasi ke halaman detail transaksi
      router.push(`/transaction/${data.id}`);
    },
    onError: (error: AxiosError<any>) => {
      // Menangkap pesan error dari response backend
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Terjadi kesalahan";
      toast.error(errorMessage);
    },
  });
};

export default useCreateTransaction;

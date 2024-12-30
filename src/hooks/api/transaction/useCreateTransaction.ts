import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Tambahkan import untuk router

export interface CreateTransactionPayload {
  userId: number;
  eventId: number;
  ticketCount: number;
  voucherId?: number | null; // Ubah ini menjadi number | null
  couponId?: number | null; // Opsional
  pointsToUse?: number; // Opsional
  status: string; // Status transaksi
  amount: number; // Pastikan amount ada juga
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

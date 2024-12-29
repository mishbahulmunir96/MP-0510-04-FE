import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface CreateTransactionPayload {
  status: string;
  userId: number;
  eventId: number;
  ticketCount: number;
  amount: number;
  paymentProof: File | null;
}

const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateTransactionPayload) => {
      const formData = new FormData();

      formData.append("userId", `${payload.userId}`);
      formData.append("eventId", `${payload.eventId}`);
      formData.append("status", payload.status);
      formData.append("ticketCount", `${payload.ticketCount}`);
      formData.append("totalPrice", `${payload.amount}`);
      if (payload.paymentProof)
        formData.append("paymentProof", payload.paymentProof);

      const { data } = await axiosInstance.post(`/transactions`, formData);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      console.log("Transaction Created Successfully");
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
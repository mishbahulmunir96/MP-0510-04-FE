"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAxios from "../../useAxios";

interface UploadPaymentProofPayload {
  transactionId: number;
  paymentProof: File;
}

const useUploadPaymentProof = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UploadPaymentProofPayload) => {
      const formData = new FormData();
      formData.append("paymentProof", payload.paymentProof); // Menambahkan file bukti pembayaran ke FormData

      const { data } = await axiosInstance.patch(
        `/transactions/${payload.transactionId}`,
        formData,
      );
      return data; // Mengembalikan hasil dari server
    },
    onSuccess: (data) => {
      toast.success("Payment proof uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["payment-proof"] }); // Memperbarui cache transaksi
      router.push(`/transaction/${data.id}`); // Arahkan ke halaman detail transaksi
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while uploading",
      );
    },
  });
};

export default useUploadPaymentProof;

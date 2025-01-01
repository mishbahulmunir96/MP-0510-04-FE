"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("register success");
      router.replace("/login");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data ||
          error.response?.data.message ||
          error.response?.data.errors,
      );
    },
  });
};

export default useRegister;
